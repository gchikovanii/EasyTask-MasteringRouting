import { Component,  DestroyRef, inject, input} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userName = '';
  // private usersService = inject(UsersService);
  // private destroyRef = inject(DestroyRef);
  // private activatedRoute = inject(ActivatedRoute);
  message = input.required<string>();
  userName = input.required<string>();
  //Working with observables
  // ngOnInit(): void {



  //   const sub = this.activatedRoute.paramMap.subscribe({
  //     next: paramMap =>  {this.userName = this.usersService.users.find((i) => i.id === paramMap.get('userId'))?.name || ''}
  //   })
  //   this.destroyRef.onDestroy(()=>{
  //     sub.unsubscribe();
  //   })
  // }
  //Simple and straightforward Signal way
  // userId = input.required<string>();
  // userName = computed(() => this.usersService.users.find((i) => i.id === this.userId())?.name); 
  

}

export const userNameResolver : ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find((i) => i.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
};

export const resolveTitle : ResolveFn<string>  = (activatedRoute, routerState) => {
  return userNameResolver(activatedRoute,routerState) + '\s Tasks'
}