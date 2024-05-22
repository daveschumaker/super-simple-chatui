import { useCallback, useState } from 'react'
import { calcTokenUsage } from '../utils/textUtils'

interface Conversation {
  role: 'user' | 'assistant'
  content: string
  timestamp: number | null
  streamingResponse?: boolean
}

/**
 * While we can pass in something like 4000 tokens (context window is 4096), the
 * text models seems to lose their character and forget the system prompt when
 * we approach 4000 tokens of context. 2000 seems to work a bit better in order
 * to "stay in character".
 *
 * Hmm... I wonder if the system prompt is included in the token count?
 */
const TOKEN_LIMIT = 2000

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

      if (tokens > TOKEN_LIMIT) {
        console.log(`Current context token length:`, tokens)
        break
      }

      newMessageArray.push(newMessage)
    }

    return newMessageArray.reverse().join('\n\n')
  }, [conversation])

  return [updateConversation, conversationContext, conversation]
}
