import { Component,  inject,  input,  } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {  ResolveFn, RouterLink } from '@angular/router';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent{

  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

  // ngOnInit(): void {
  //   const subs = this.activatedRoute.queryParams.subscribe({
  //     next: (params) => (this.order.set(params['order']))
  //   })
  //   this.destroyRef.onDestroy(() => subs.unsubscribe())
  // }
  // // order = input<'asc'|'desc'>();
  // order = signal<'asc'|'desc'>('asc');

  // userId = input.required<string>();
  // private taskService = inject(TasksService);
  // userTasks = computed(() => this.taskService.allTasks().filter((task) => task.userId === this.userId())
  // .sort((a,b) => {
  //   if(this.order() === 'desc'){
  //     return a.id > b.id ? 1 : -1;
  //   }
  //   else{
  //     return a.id >b.id ? -1 : 1;
  //   }
  // }));
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
