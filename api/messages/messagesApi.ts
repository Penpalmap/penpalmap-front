import axiosInstance from '../../axiosInstance'
import { CreateMessageDto } from './messagesDto'

const createMessage = async (message: CreateMessageDto) => {
  try {
    const response = await axiosInstance.post('/api/messages', message)
    return response.data
  } catch (error) {
    console.error('Error while creating message', error)
    throw error
  }
}

export { createMessage }
