import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/list/user-list.component';
import { UserFormComponent } from './features/form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // ✅ Điều hướng mặc định
  { path: 'users', component: UserListComponent },
  { path: 'users/add-user', component: UserFormComponent }, // ✅ Thống nhất cách đặt tên
  { path: '**', redirectTo: 'users' } // ✅ Route mặc định nếu không khớp
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
