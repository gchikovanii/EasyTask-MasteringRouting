import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{
  ngOnInit(): void {
    const subs = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order.set(params['order']))
    })
    this.destroyRef.onDestroy(() => subs.unsubscribe())
  }
  // order = input<'asc'|'desc'>();
  order = signal<'asc'|'desc'>('desc');

  userId = input.required<string>();
  private taskService = inject(TasksService);
  userTasks = computed(() => this.taskService.allTasks().filter((task) => task.userId === this.userId())
  .sort((a,b) => {
    if(this.order() === 'desc'){
      return a.id > b.id ? 1 : -1;
    }
    else{
      return a.id >b.id ? -1 : 1;
    }
  }));
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
}
