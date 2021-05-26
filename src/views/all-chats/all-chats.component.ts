import { Component, OnInit } from '@angular/core';
import { Chat } from '../../interfaces/Chat'
import { User } from '../../interfaces/User'
import { ChatServiceService } from '../../services/chat-service.service'
import { UserServiceService } from '../../services/user-service.service'

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit{
  message = '';
  selectedChat:Chat;
  allChats: Chat[];
  currentUser: User;

  constructor(private chatService: ChatServiceService, private userService: UserServiceService){}
  
  ngOnInit(): void {
    this.chatService.allChatsSubject.subscribe((chats)=>{
      if(chats.length > 0){
        this.allChats = chats;
        this.chatService.changeCurrentChat(chats[0].id);
      }
    })

    this.chatService.currentChatSubject.subscribe((chat) =>{
      if(chat){
        this.selectedChat = chat;
      }
    })

    this.userService.currentUserSubject.subscribe((user) => {
      this.currentUser = user;
    })
  }

  async sendMessage(): Promise<void>{
    try {
      if(this.selectedChat && this.message.length > 0){
        const result = await this.chatService.sendMessage(this.selectedChat.id, this.message);
        if(result === 'Success'){
          this.message = '';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

}
