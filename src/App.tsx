import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { IconSend } from '@tabler/icons-react'

import Button from './components/Button'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  return (
    <div className="flex flex-col gap-1 w-full">
      <h1>Simple AI Chat UI</h1>
      <div className="flex flex-row gap-2 items-end">
        <ReactTextareaAutosize
          id="message"
          maxRows={6}
          minRows={1}
          className="min-h-[46px] block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message to an AI assistant"
          value={message}
        />
        <Button onClick={() => console.log(message)}>
          <IconSend />
        </Button>
      </div>
      <div className="flex flex-row gap-2 text-xs">
        ({message.length} {message.length === 1 ? 'character' : 'characters'})
      </div>
    </div>
  )
}

export default App
