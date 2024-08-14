import {  Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../new-task/new-task.component";
import { resolveUserTasks, TasksComponent } from "../tasks.component";
import { TasksService } from "../tasks.service";

export const routes : Routes  = [
  {
    path:'',
    providers: [TasksService],
    children:[
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', 
        // loadComponent : () => import('../tasks.component').then(mod => mod.TasksComponent),
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
  },
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
    
]