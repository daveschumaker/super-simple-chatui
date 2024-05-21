import { useCallback, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { IconSend } from '@tabler/icons-react'

import Button from './components/Button'
import useConversation from './hooks/useConversation'
import { calcTokenUsage } from './utils/textUtils'
import TypingAnimation from './components/TypingAnimation'
import { ollamaApiCall } from './api/ollama'
import { formatTimestamp } from './utils/numberUtils'
import './App.css'

function App() {
  // const [response, setResponse] = useState('')
  const [userInput, setUserInput] = useState('')
  const [updateConversation, conversationContext, conversation] =
    useConversation()
  const [pendingResponse, setPendingResponse] = useState(false)

  const sendMessage = useCallback(
    async (input: string) => {
      setPendingResponse(true)
      let responseMessage = ''
      console.log(`conversationContext`, conversationContext())

      await ollamaApiCall(input, async (part: string) => {
        setPendingResponse(false)
        responseMessage += part

        await updateConversation({
          role: 'assistant',
          content: responseMessage,
          timestamp: null,
          streamingResponse: true
        })
      })

      // Final update to ensure conversation is
      // fully updated with the complete response
      await updateConversation({
        role: 'assistant',
        content: responseMessage,
        timestamp: Date.now(),
        streamingResponse: true
      })
    },
    [updateConversation]
  )

  const handleEnterKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        await updateConversation({
          role: 'user',
          content: userInput,
          timestamp: Date.now(),
          streamingResponse: false
        })
        sendMessage(userInput)
        setUserInput('')
      }
    },
    [sendMessage, userInput]
  )

  return (
    <div className="flex flex-col gap-1 w-full" id="header">
      <div className="mb-4 sticky top-0 bg-inherit py-2 gap-2 flex flex-col">
        <h1 className="flex flex-row gap-2 items-center justify-center md:font-[32px]">
          <img src="/chat.png" width="48" />
          Super Simple ChatUI ™
        </h1>
        <div className="flex flex-row gap-2 items-end">
          <ReactTextareaAutosize
            id="message"
            maxRows={6}
            minRows={1}
            className="min-h-[46px] block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleEnterKeyDown}
            placeholder="Your message"
            value={userInput}
          />
          <Button
            onClick={async () => {
              await updateConversation({
                role: 'user',
                content: userInput,
                timestamp: Date.now(),
                streamingResponse: false
              })
              setTimeout(() => {
                sendMessage(userInput)
                setUserInput('')
              }, 500)
            }}
          >
            <IconSend />
          </Button>
        </div>
        <div className="flex flex-row gap-2 text-xs font-mono">
          [ {userInput.length}{' '}
          {userInput.length === 1 ? 'character' : 'characters'} /{' '}
          {calcTokenUsage('user', userInput)}{' '}
          {calcTokenUsage('user', userInput) === 1 ? 'token' : 'tokens'} ]
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {pendingResponse && (
          <div className={`flex flex-col w-full gap-1 pr-[40%] items-start`}>
            <div
              className={`flex flex-row gap-2 text-left text-sm rounded-md p-2.5 bg-gray-600 text-white`}
            >
              <TypingAnimation />
            </div>
          </div>
        )}
        {conversation.map((message) => (
          <div
            className={`flex flex-col w-full gap-1
            ${message.role === 'assistant' ? 'pr-[20%] md:pr-[40%] items-start' : 'pl-[20%] md:pl-[40%] items-end'}
            `}
            key={message.timestamp}
          >
            <div
              className={`flex flex-row gap-2 text-left text-sm rounded-md p-2.5
                ${message.role === 'assistant' ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'}`}
            >
              {!message.content ? (
                <TypingAnimation />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: message.content.replace(/\n/g, '<br />')
                  }}
                  style={{
                    wordBreak: 'break-word'
                  }}
                />
              )}
            </div>
            {message.timestamp && (
              <div className="text-xs">
                {formatTimestamp(message.timestamp)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
