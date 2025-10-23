import { Component, OnInit, inject } from '@angular/core'
import { Button } from 'primeng/button'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs'
import { TableModule } from 'primeng/table'
import { Role } from '../../domain/role'
import { RoleService } from '../../service/role.service'
import { TextBlock } from '../../domain/textBlock'
import { TextBlockService } from '../../service/text-block.service'

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
  private readonly textBlockService = inject(TextBlockService)

  readonly roles = this.roleService.roles
  hiddenCCs = new Set<number>()

  textBlocks!: TextBlock[]

  constructor() {}

  ngOnInit() {
    void this.roleService.load()
    this.textBlocks = this.textBlockService.getTextBlockData()

    Office.onReady().then(() => {

      if (Office.context.host === Office.HostType.Word) {
        Office.context.document.settings.set('Office.AutoShowTaskpaneWithDocument', true)
        Office.context.document.settings.saveAsync()
      }
    })
  }

  isRoleHidden(id: number): boolean {
    return this.hiddenCCs.has(id)
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
    const isHidden = this.hiddenCCs.has(role.id)

    await Word.run(async context => {
      const ccs = context.document.contentControls.getByTag(`role:${role.id}`)
      ccs.load('items')
      await context.sync()

      ccs.items.forEach(cc => {
        if (isHidden) {
          cc.appearance = Word.ContentControlAppearance.tags
          this.hiddenCCs.delete(role.id)
        } else {
          cc.appearance = Word.ContentControlAppearance.hidden
          this.hiddenCCs.add(role.id)
        }
      })

      await context.sync()
    })
  }

  async addTextBlock(textBlock: TextBlock) {
    await Word.run(async context => {
      const sel = context.document.getSelection()

      const range = sel.insertText(textBlock.content, Word.InsertLocation.replace)

      const cc = range.insertContentControl()
      cc.tag = `textBlock:${textBlock.id}`
      cc.title = textBlock.name
      cc.appearance = Word.ContentControlAppearance.tags

      await context.sync()
    })
  }

  async removeTextBlock(textBlock: TextBlock) {
    await Word.run(async context => {
      debugger
      const range = context.document.getSelection()
      const parentCC = range.parentContentControlOrNullObject
      parentCC.load(['tag', 'id'])
      await context.sync()

      if (!parentCC.isNullObject && parentCC.tag === `textBlock:${textBlock.id}`) {
        parentCC.delete(true)
        await context.sync()
      }
    })
  }

  async toggleTextBlockVisibility(textBlock: TextBlock) {
    const isHidden = this.hiddenCCs.has(textBlock.id)

    await Word.run(async context => {
      const ccs = context.document.contentControls.getByTag(`textBlock:${textBlock.id}`)
      ccs.load('items')
      await context.sync()

      ccs.items.forEach(cc => {
        if (isHidden) {
          cc.appearance = Word.ContentControlAppearance.tags
          this.hiddenCCs.delete(textBlock.id)
        } else {
          cc.appearance = Word.ContentControlAppearance.hidden
          this.hiddenCCs.add(textBlock.id)
        }
      })

      await context.sync()
    })
  }
}
