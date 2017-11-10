import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { PartialTopNavComponent } from './partial-top-nav/partial-top-nav.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'message',
    component: MessageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
