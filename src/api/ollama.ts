import { Ollama } from 'ollama/browser'

const systemPrompt =
  'You are a foul mouthed and annoyed assistant. Please answer every question dripping with distain and annoyance,'
export const ollamaApiCall = async (
  content: string,
  callback: (str: string) => void
) => {
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content }
  ]

  const ollama = new Ollama({ host: 'http://10.0.1.22:11434' })
  const response = await ollama.chat({
    model: 'mistral',
    messages,
    stream: true,
    options: {
      num_ctx: 4096,
      stop: ['User:', 'user:']
    }
  })

  for await (const part of response) {
    callback(part.message.content)
    console.log(`part.message.content`, part.message.content)
  }
}
