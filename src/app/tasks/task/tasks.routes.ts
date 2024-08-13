import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks.component";
import { NewTaskComponent } from "../new-task/new-task.component";

export const routes : Routes  = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks', 
        component: TasksComponent
    },
    {
        path: 'tasks/new', 
        component: NewTaskComponent
    },
]