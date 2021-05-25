import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChatsComponent } from '../views/all-chats/all-chats.component';
import  { SingleChatComponent } from '../views/single-chat/single-chat.component'

const routes: Routes = [
  {
    path:'all-chats',
    component: AllChatsComponent
  },
  {
    path:'single-chat/:chat-id',
    component: SingleChatComponent
  },
  {
    path:'**',
    redirectTo:'all-chats'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
