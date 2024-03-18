export enum SocketEvents {
  JoinRoom = 'JOIN_ROOM',
  LeaveRoom = 'LEAVE_ROOM',
  NewMessage = 'MESSAGE_SENT',
  SeenMessage = 'MESSAGE_SEEN',
  SendSeenMessage = 'SEND_SEEN_MESSAGE',
  AddUser = 'LOGGED_IN',
  IsTyping = 'IS_TYPING',
  StopIsTyping = 'STOP_IS_TYPING',
  OnlineUsers = 'ONLINE_USERS',
  CreateRoom = 'CREATE_ROOM',
  NewRoom = 'NEW_ROOM',
}
