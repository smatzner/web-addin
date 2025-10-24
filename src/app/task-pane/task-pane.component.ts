import { Component, OnInit, inject } from '@angular/core'
import { Button } from 'primeng/button'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs'
import { TableModule } from 'primeng/table'
import { Role } from '../../domain/role'
import { RoleService } from '../../service/role.service'

type RoleCategory = 'role' | 'baustein' | 'betriebsform'

@Component({
  selector: 'app-task-pane',
  imports: [
    Button,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    TableModule,
  ],
  templateUrl: './task-pane.component.html',
  styleUrl: './task-pane.component.scss',
  standalone: true,
})
export class TaskPaneComponent implements OnInit {
  private readonly roleService = inject(RoleService)

  readonly mitarbeiterRoles = this.roleService.mitarbeiterRoles
  readonly bausteinRoles = this.roleService.bausteinRoles
  readonly betriebsformArtenRoles = this.roleService.betriebsformArtenRoles
  hiddenCCs = new Set<string>()

  constructor() {}

  ngOnInit() {
    void this.roleService.load()

    Office.onReady().then(() => {

      if (Office.context.host === Office.HostType.Word) {
        Office.context.document.settings.set('Office.AutoShowTaskpaneWithDocument', true)
        Office.context.document.settings.saveAsync()
      }
    })
  }

  isRoleHidden(id: number, category: RoleCategory = 'role'): boolean {
    return this.hiddenCCs.has(this.roleTag(category, id))
  }

  async addRole(role: Role, category: RoleCategory = 'role') {
    const tag = this.roleTag(category, role.id)

    await Word.run(async context => {
      const sel = context.document.getSelection()

      let cc: Word.ContentControl

      if (category === 'role') {
        cc = sel.insertContentControl()
      } else {
        const range = sel.insertText(this.resolveRoleContent(role), Word.InsertLocation.replace)
        cc = range.insertContentControl()
      }

      cc.tag = tag
      cc.title = role.name
      cc.appearance = Word.ContentControlAppearance.tags

      await context.sync()
    })
  }

  async removeRole(role: Role, category: RoleCategory = 'role') {
    const tag = this.roleTag(category, role.id)

    await Word.run(async context => {
      const range = context.document.getSelection()
      const parentCC = range.parentContentControlOrNullObject
      parentCC.load(['tag', 'id'])
      await context.sync()

      if (!parentCC.isNullObject && parentCC.tag === tag) {
        parentCC.delete(true)
        await context.sync()
      }
    })
  }

  async toggleRoleVisibility(role: Role, category: RoleCategory = 'role') {
    const tag = this.roleTag(category, role.id)
    const isHidden = this.hiddenCCs.has(tag)

    await Word.run(async context => {
      const ccs = context.document.contentControls.getByTag(tag)
      ccs.load('items')
      await context.sync()

      ccs.items.forEach(cc => {
        if (isHidden) {
          cc.appearance = Word.ContentControlAppearance.tags
          this.hiddenCCs.delete(tag)
        } else {
          cc.appearance = Word.ContentControlAppearance.hidden
          this.hiddenCCs.add(tag)
        }
      })

      await context.sync()
    })
  }

  private roleTag(category: RoleCategory, id: number): string {
    return `${category}:${id}`
  }

  private resolveRoleContent(role: Role): string {
    return role.description?.trim().length ? role.description : role.name
  }
}
