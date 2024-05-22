import { Ollama } from 'ollama/browser'
import { getSystemPromptAndSuffix } from '../store/SystemPromptController'

export const ollamaApiCall = async (
  content: string,
  callback: (str: string) => void
) => {
  const messages = [
    { role: 'system', content: getSystemPromptAndSuffix() },
    { role: 'user', content }
  ]

  const ollama = new Ollama({ host: 'http://10.0.1.22:11434' })
  const response = await ollama.chat({
    model: 'wizardlm2',
    messages,
    stream: true,
    options: {
      num_ctx: 4096,
      stop: ['User:', 'user:'],
      temperature: 0.9
    }
  })

  for await (const part of response) {
    callback(part.message.content)
  }
}
