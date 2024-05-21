import { Ollama } from 'ollama/browser'

export const ollamaApiCall = async (
  content: string,
  callback: (str: string) => void
) => {
  const message = { role: 'user', content }

  const ollama = new Ollama({ host: 'http://10.0.1.22:11434' })
  const response = await ollama.chat({
    model: 'mistral',
    messages: [message],
    stream: true
  })

  for await (const part of response) {
    callback(part.message.content)
  }
}
