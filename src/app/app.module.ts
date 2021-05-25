import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllChatsComponent } from '../views/all-chats/all-chats.component';
import { SingleChatComponent } from '../views/single-chat/single-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AllChatsComponent,
    SingleChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
