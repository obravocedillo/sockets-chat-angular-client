import { Message } from './Message'
export interface User {
    id: string;
    name: string;
    messages?: Message[]
}