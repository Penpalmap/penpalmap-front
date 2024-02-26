import axiosInstance from '../../axiosInstance'
import { CreateMessageDto, UpdateMessageDto } from './messagesDto'

const createMessage = async (message: CreateMessageDto) => {
  try {
    const response = await axiosInstance.post('/api/messages', message)
    return response.data
  } catch (error) {
    console.error('Error while creating message', error)
    throw error
  }
}

const updateMessage = async (message: UpdateMessageDto) => {
  try {
    const response = await axiosInstance.patch('/api/messages', message)
    return response.data
  } catch (error) {
    console.error('Error while creating message', error)
    throw error
  }
}

const deleteMessage = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/messages/${id}`)
    return response.data
  } catch (error) {
    console.error('Error while creating message', error)
    throw error
  }
}

export { createMessage, deleteMessage, updateMessage }
