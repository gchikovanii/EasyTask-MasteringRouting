import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, userNameResolver, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { routes as UserRoutes } from './tasks/task/tasks.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const testingCanMatch : CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 1)
        return true;
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', 
        component: NoTaskComponent,
        title: 'No-Task'
    },
    {
        path: 'users/:userId', 
        component: UserTasksComponent,
        children: UserRoutes,
        resolve: {
            userName: userNameResolver
        },
        //Guard
        canMatch: [testingCanMatch],
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];
