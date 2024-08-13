import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../new-task/new-task.component";

export const routes : Routes  = [
    // {
    //     path: '',
    //     redirectTo: 'tasks',
    //     pathMatch: 'prefix'
    // },
    // {
    //     path: 'tasks', 
    //     component: TasksComponent
    // },
    // {
    //     path: 'tasks/new', 
    //     component: NewTaskComponent
    // },
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', 
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        canDeactivate: [canLeaveEditPage],
        component: NewTaskComponent,
      },
]