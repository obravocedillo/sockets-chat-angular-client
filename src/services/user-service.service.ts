import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/User'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  currentUser:User = {
    id: '0000',
    name: 'Brandon Bravo'
  }

  public currentUserSubject:BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser);
}
