/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../interfaces/User'
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private socket;
  constructor(){
    this.init();
  }

  allUsers:User[] = [
    {
      id: '0001',
      name: 'Oliver Bravo',
      messages: [
        {
          id:'1',
          sender: '0002',
          message: 'Hola, ¿Cómo estas?',
          receiver: '0001',
          date: '2021/05/26'
        }
      ]
    }
  ];

  allUsersSubject:BehaviorSubject<User[]> = new BehaviorSubject(this.allUsers);
  public currentUserSubject: ReplaySubject<User> = new ReplaySubject();

  init():void {
    try {
      this.socket = io('http://localhost:8080',{transports: ['websocket']});
      this.connectToAllChats();
      this.listenMessages();
    } catch (error) {
      console.log('Could not connect socket.io');
    }
  }

  listenMessages(): void{
    try {
      //Draft observable 
      this.socket.on('newMessage', data => {
        for(const [userIndex, user] of this.allUsers.entries()){
          if(user.id == data.id){
            console.log('user');
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
        this.currentUserSubject.next(user);
        break;
      }
    }
  }
}
