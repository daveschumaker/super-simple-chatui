import ReactTextareaAutosize from 'react-textarea-autosize'
import Button from './Button'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useState } from 'react'
import {
  getSystemPrompt,
  updateSystemPrompt
} from '../store/SystemPromptController'

export default function SystemPrompt() {
  const [systemPrompt, setSystemPrompt] = useState(getSystemPrompt())

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>System prompt</div>
      <div className="flex flex-row gap-2 items-end">
        <ReactTextareaAutosize
          id="message"
          maxRows={6}
          minRows={1}
          className="min-h-[46px] block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="System instructions"
          value={systemPrompt}
        />
        <Button
          onClick={() => {
            updateSystemPrompt(systemPrompt)
          }}
        >
          <IconDeviceFloppy />
        </Button>
      </div>
    </div>
  )
}
