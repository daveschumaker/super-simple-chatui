import { GPTTokens } from 'gpt-tokens'

export const calcTokenUsage = (
  role: 'user' | 'assistant' = 'user',
  content: string
) => {
  if (!content) return 0

  const usageInfo = new GPTTokens({
    model: 'gpt-4-turbo',
    messages: [{ role, content }]
  })

  return usageInfo.usedTokens
}
