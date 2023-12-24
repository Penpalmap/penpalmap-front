export enum SocketEvents {
    JoinRoom = 'JOIN_ROOM',
    LeaveRoom = 'LEAVE_ROOM',
    NewMessage = 'NEW_MESSAGE',
    SendMessage = 'SEND_MESSAGE',
    SeenMessage = 'SEEN_MESSAGE',
    SendSeenMessage = 'SEND_SEEN_MESSAGE',
    AddUser = 'ADD_USER',
    IsTyping = 'IS_TYPING',
    StopIsTyping = 'STOP_IS_TYPING',
    OnlineUsers = 'ONLINE_USERS',
    CreateRoom = 'CREATE_ROOM',
    NewRoom = 'NEW_ROOM',
}
