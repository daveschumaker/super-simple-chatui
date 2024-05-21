import { useCallback, useState } from 'react'
import { calcTokenUsage } from '../utils/textUtils'

interface Conversation {
  role: 'user' | 'assistant'
  content: string
  timestamp: number | null
  streamingResponse?: boolean
}

export default function useConversation(): [
  updateConversation: (message: Conversation) => void,
  conversationContext: () => string,
  conversation: Conversation[]
] {
  const [conversation, setConversation] = useState<Conversation[]>([])

  const updateConversation = useCallback((message: Conversation) => {
    return new Promise<void>((resolve) => {
      setConversation((prevConversation) => {
        const [recentConversation, ...conversation] = prevConversation

        if (
          message.streamingResponse &&
          recentConversation?.role !== message.role
        ) {
          return [message, ...prevConversation]
        } else if (
          message.streamingResponse &&
          recentConversation?.role === message.role
        ) {
          return [message, ...conversation]
        } else {
          return [message, ...prevConversation]
        }
      })
      setTimeout(() => resolve(), 10)
    })
  }, [])
  const conversationContext = useCallback(() => {
    const newMessageArray: string[] = []

    for (const message of conversation) {
      const newMessage = `${message.role}: ${message.content}`
      const msgString = newMessageArray.join('\n')
      const tokens = calcTokenUsage('user', msgString)

      if (tokens > 4000) {
        break
      }

      newMessageArray.push(newMessage)
    }

    return newMessageArray.reverse().join('\n\n')
  }, [conversation])

  return [updateConversation, conversationContext, conversation]
}
