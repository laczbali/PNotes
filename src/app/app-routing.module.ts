import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [

  {
    path: '', component: BaseComponent, canActivate: [authGuard], children: [
      { path: 'sandbox', component: SandboxComponent },
    ]
  },

  { path: 'auth', component: AuthComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
