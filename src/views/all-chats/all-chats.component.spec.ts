import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular'
import { AllChatsComponent } from './all-chats.component';
import { ChatServiceService } from '../../services/chat-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { FormsModule } from '@angular/forms'

describe('AllChatsComponent', () => {
  let component: AllChatsComponent;
  let fixture: ComponentFixture<AllChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ ChatServiceService, UserServiceService ],
      declarations: [ AllChatsComponent ],
      imports:[ FormsModule ],
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AllChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should load a list with chats gotten from the chat service', async () => {
    await render(AllChatsComponent ,{ providers: [
      ChatServiceService,
      UserServiceService
    ]});
    const singleChatsLastMessage = screen.getAllByTestId('single-chat-last-message');
    expect(singleChatsLastMessage.length).toEqual(1);
  })


  it('Should load the last message of the first element in the all chats array in service', async () => {
    await render(AllChatsComponent ,{ providers: [
      ChatServiceService,
      UserServiceService
    ]});

    const currentChatMessages = screen.getAllByTestId('single-chat-message');
    expect(currentChatMessages[0].innerHTML).toEqual(' Hola, ¿Cómo estas? ');
    expect(currentChatMessages.length).toEqual(1); 
  })
});
