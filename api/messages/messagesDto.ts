interface PaginatedQueryDto {
  // Supposons que PaginatedQueryDto définisse ces propriétés, ajustez selon vos besoins
  limit?: number
  offset?: number
}

type Order = 'ASC' | 'DESC'

// Ceci pourrait être une énumération ou un type union, selon votre cas d'usage
// Par exemple, si les seuls champs valides pour le tri sont 'createdAt' et 'updatedAt'
type OrderableMessageFields = 'createdAt' | 'updatedAt'

interface OrderDto<T> {
  orderBy?: T
  order?: Order
}

// Conversion de la classe en type TypeScript
export type QueryMessagesDto = PaginatedQueryDto &
  OrderDto<OrderableMessageFields> & {
    roomId?: string // Le ? indique que la propriété est optionnelle
  }

export type CreateMessageDto = {
  content: string
  roomId: string
  senderId: string
}

export type UpdateMessageDto = {
  content?: string
  isSeen?: boolean
}
