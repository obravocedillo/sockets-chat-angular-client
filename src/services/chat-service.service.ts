/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../interfaces/User'
import { Chat } from '../interfaces/Chat'
import { SocketMessage } from '../interfaces/Message'
import { UserServiceService } from '../services/user-service.service'
import { io } from "socket.io-client";
import { createRandomString } from '../utils/fns'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private socket;
  currentChat: Chat;
  currentUser:User;
  allUsers:Chat[] = [
    {
      id: '0001',
      name: 'Oliver Bravo',
      messages: [
        {
          id:'1',
          sender: '0002',
          message: 'Hola, ¿Cómo estas?',
          receiver: '0001',
          date: 'Mon April 05 2021'
        }
      ]
    }
  ];

  allChatsSubject:BehaviorSubject<Chat[]> = new BehaviorSubject(this.allUsers);
  public currentChatSubject: ReplaySubject<Chat> = new ReplaySubject();

  constructor( private userService:UserServiceService ){
    this.init();
  }

  init():void {
    try {
      this.socket = io('http://localhost:8080',{transports: ['websocket']});
      this.connectToAllChats();
      this.listenMessages();
      this.userService.currentUserSubject.subscribe((user)=>{
        if(user){
          this.currentUser = user;
        }
      })
    } catch (error) {
      console.log('Could not connect socket.io');
    }
  }

  listenMessages(): void{
    try {
      //Draft observable 
      this.socket.on('newMessage', (data:SocketMessage) => {
        for(const [userIndex, user] of this.allUsers.entries()){
          if(user.id == data.id && this.currentChat){
            this.allUsers[userIndex].messages.push({
              id: createRandomString(4),
              sender: this.currentUser.id,
              message: data.message,
              receiver: this.currentChat.id,
              date: new Date().toDateString()
            })
            this.allChatsSubject.next(this.allUsers);
            this.currentChatSubject.next(this.allUsers[userIndex]);
          }else{
            this.allUsers[userIndex].messages.push({
              id: createRandomString(4),
              sender: this.currentUser.id,
              message: data.message,
              receiver: this.allUsers[0].id,
              date: new Date().toDateString()
            })
            this.allChatsSubject.next(this.allUsers);
            this.currentChatSubject.next(this.allUsers[userIndex]);
          }
        }
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  connectToAllChats():void{
    for(const user of this.allUsers){
      try {
        if(this.socket){
          this.socket.emit('joinChat', user.id);
        }
      } catch (e) {
       console.log('Could not connect socket.io');
      }
    }
  }

  sendMessage(chatId: string, message: string):Promise<string>{
    return new Promise<string>((resolve, reject) => {
      try {
        this.socket.emit('sendMessage', chatId, message);
        resolve('Success')
      } catch (e) {
       console.log('Could not connect socket.io');
       reject('Error');
      }
    })
  }

  changeCurrentChat(newCurrentUserId: string): void{
    for(const user of this.allUsers){
      if(user.id == newCurrentUserId){
        this.currentChatSubject.next(user);
        this.currentChat = user;
        break;
      }
    }
  }
}
