import {Component, OnInit} from '@angular/core'
import {Button} from 'primeng/button'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs'
import {TableModule} from 'primeng/table'
import {Role} from '../../domain/role'
import {RoleService} from '../../service/role.service'

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
  roles!: Role[]
  hiddenRoles = new Set<number>()

  constructor(private roleService: RoleService) {
  }

  ngOnInit() {
    this.roles = this.roleService.getRoleData()
  }

  isRoleHidden(role: Role) {
    return this.hiddenRoles.has(role.id)
  }

  async addRole(role: Role) {
    await Word.run(async context => {
      const sel = context.document.getSelection()
      const cc = sel.insertContentControl()

      cc.tag = `role:${role.id}`
      cc.title = role.name
      cc.appearance = Word.ContentControlAppearance.tags

      await context.sync()
    })
  }

  async removeRole(role: Role) {
    await Word.run(async context => {
      const range = context.document.getSelection()
      const parentCC = range.parentContentControlOrNullObject
      parentCC.load(['tag', 'id'])
      await context.sync()

      if (!parentCC.isNullObject && parentCC.tag === `role:${role.id}`) {
        parentCC.delete(true)
        await context.sync()
      }
    })
  }

  async toggleRoleVisibility(role: Role) {
    const isHidden = this.hiddenRoles.has(role.id)

    await Word.run(async context => {
      const ccs = context.document.contentControls.getByTag(`role:${role.id}`)
      ccs.load('items')
      await context.sync()

      ccs.items.forEach(cc => {
        if(isHidden){
          cc.appearance = Word.ContentControlAppearance.tags
          this.hiddenRoles.delete(role.id)
        }
        else{
          cc.appearance = Word.ContentControlAppearance.hidden
          this.hiddenRoles.add(role.id)
        }
      })

      await context.sync()
    })
  }

  async asdf(role: Role) {
    await Word.run(async context => {
      const range = context.document.getSelection()
      const parentCC = range.parentContentControlOrNullObject
      parentCC.load(['tag', 'id'])
      await context.sync()

      if (!parentCC.isNullObject && parentCC.tag === `role:${role.id}`) {
        parentCC.appearance = Word.ContentControlAppearance.hidden
        await context.sync()
      }
    })
  }
}
