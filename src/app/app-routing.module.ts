import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { SecondFactorComponent } from './components/second-factor/second-factor.component';
import { ThirdFactorComponent } from './components/third-factor/third-factor.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'secondfactor', component: SecondFactorComponent },
  { path: 'thirdfactor', component: ThirdFactorComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
