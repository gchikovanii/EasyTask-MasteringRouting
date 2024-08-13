import { Component, computed, DestroyRef, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  userName = '';
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  //Working with observables
  ngOnInit(): void {
    const sub = this.activatedRoute.paramMap.subscribe({
      next: paramMap =>  {this. userName = this.usersService.users.find((i) => i.id === paramMap.get('userId'))?.name || ''},

    })
    this.destroyRef.onDestroy(()=>{
      sub.unsubscribe();
    })
  }
  //Simple and straightforward Signal way
  // userId = input.required<string>();
  // userName = computed(() => this.usersService.users.find((i) => i.id === this.userId())?.name); 
  
  private activatedRoute = inject(ActivatedRoute);


}
