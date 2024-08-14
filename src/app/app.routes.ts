import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, userNameResolver, UserTasksComponent } from './users/user-tasks/user-tasks.component';
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
        // children: UserRoutes,
        loadChildren: () => import('./tasks/task/tasks.routes').then(mod => mod.routes),
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
