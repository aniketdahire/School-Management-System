import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    //defautl route
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    //after login it will show this route
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teacher',
    component:TeacherComponent,
    canActivate:[authGuard],
  },
  {
    path: 'admin',
    component:AdminComponent,
    canActivate:[authGuard],
  }
];
