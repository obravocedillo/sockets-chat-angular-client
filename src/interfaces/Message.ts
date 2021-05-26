export interface Message {
    id: string;
    sender: string;
    receiver: string;
    message: string;
    date: string;
}

export interface SocketMessage { 
    message: string,
    id: string
}