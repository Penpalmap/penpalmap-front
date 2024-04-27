import axiosInstance from '../../axiosInstance'
import { PageDto } from '../../types/pagination'
import { CreateRoomDto, QueryRoomDto, RoomDto, UpdateRoomDto } from './roomDto'

const getRooms = async ({
  userIds,
  limit = 20,
  offset = 0,
}: QueryRoomDto): Promise<PageDto<RoomDto>> => {
  try {
    const userParams = userIds?.join('&userIds[]=')

    const rooms = await axiosInstance.get(
      `/api/rooms?userIds[]=${userParams}&limit=${limit}&offset=${offset}`
    )
    return rooms.data
  } catch (error) {
    console.error('Error while getting users in map', error)
    throw error
  }
}

const createRoom = async ({ memberIds }: CreateRoomDto): Promise<any> => {
  try {
    const room = await axiosInstance.post('/api/rooms', { memberIds })
    return room.data
  } catch (error) {
    console.error('Error while creating room', error)
    throw error
  }
}

const getRoomById = async (roomId: string): Promise<RoomDto> => {
  try {
    const room = await axiosInstance.get(`/api/rooms/${roomId}`)
    return room.data
  } catch (error) {
    console.error('Error while getting users in map', error)
    throw error
  }
}

const updateRoom = async (
  roomId: string,
  input: UpdateRoomDto
): Promise<RoomDto> => {
  try {
    const room = await axiosInstance.patch(`/api/rooms/${roomId}`, {
      input,
    })
    return room.data
  } catch (error) {
    console.error('Error while getting users in map', error)
    throw error
  }
}
export { getRooms, createRoom, getRoomById, updateRoom }
