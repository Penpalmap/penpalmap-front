export enum SocketEvents {
  JoinRoom = 'JOIN_ROOM',
  LeaveRoom = 'LEAVE_ROOM',
  NewMessage = 'MESSAGE_SENT',
  SeenMessage = 'MESSAGE_SEEN',
  SendSeenMessage = 'SEND_SEEN_MESSAGE',
  LoggedIn = 'LOGGED_IN',
  StopIsTyping = 'STOP_IS_TYPING',
  OnlineUsers = 'ONLINE_USERS',
  CreateRoom = 'CREATE_ROOM',
  NewRoom = 'NEW_ROOM',
}
