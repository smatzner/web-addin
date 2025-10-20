import { bootstrapApplication } from '@angular/platform-browser'
import { TaskPaneComponent } from './app/task-pane/task-pane.component'
import { appConfig } from './app/app.config'


if (typeof Office !== 'undefined') {
  Office.onReady().then(() => {
    bootstrapApplication(TaskPaneComponent, appConfig)
  })
} else {
  bootstrapApplication(TaskPaneComponent, appConfig)
}
