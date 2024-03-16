// import { Room } from '../types'

// export const sortRoomsByLastMessageDate = (a: Room, b: Room) => {
//   if (
//     a.messages.length > 0 &&
//     b.messages.length > 0 &&
//     a.messages[0] &&
//     b.messages[0]
//   ) {
//     return (
//       new Date(b.messages[0].createdAt).getTime() -
//       new Date(a.messages[0].createdAt).getTime()
//     )
//   } else if (a.messages.length > 0) {
//     return -1
//   } else if (b.messages.length > 0) {
//     return 1
//   } else {
//     return 0
//   }
// }
