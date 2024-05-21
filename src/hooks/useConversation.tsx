import { useCallback, useState } from 'react'

interface Conversation {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  streamingResponse?: boolean
}

export default function useConversation(): [
  updateConversation: (message: Conversation) => void,
  conversation: Conversation[]
] {
  const [conversation, setConversation] = useState<Conversation[]>([])
  const updateConversation = useCallback(async (message: Conversation) => {
    setConversation((prevConversation) => {
      const [recentConversation, ...rest] = prevConversation

      if (
        message.streamingResponse &&
        recentConversation?.role !== message.role
      ) {
        console.log(`condition 1`, message)
        return [message, ...prevConversation]
      } else if (
        message.streamingResponse &&
        recentConversation?.role === message.role
      ) {
        console.log(`condition 2`, message)
        return [message, ...rest]
      } else {
        console.log(`condition 3`, message)
        return [message, ...prevConversation]
      }
    })
  }, [])

  return [updateConversation, conversation]
}
