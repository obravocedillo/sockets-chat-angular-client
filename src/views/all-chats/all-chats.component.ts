import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User'
import { ChatServiceService } from '../../services/chat-service.service'

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit{
  message = '';
  selectedChat:User;

  constructor(private chatService: ChatServiceService){}
  
  ngOnInit(): void {
    this.chatService.allUsersSubject.subscribe((users)=>{
      if(users.length > 0){
        this.chatService.changeCurrentChat(users[0].id);
      }
    })

    this.chatService.currentUserSubject.subscribe((user) =>{
      if(user){
        this.selectedChat = user;
      }
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
