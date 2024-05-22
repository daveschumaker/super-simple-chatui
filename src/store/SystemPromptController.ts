/**
 * This is a super simple / hack to track state of system prompt.
 * This should probably be some sort of legit store using something
 * like Zustand or statery... but I'm feeling lazy at the moment.
 */

const defaultSuffix = `
\nIMPORTANT: The format of the conversation will look like this. Even though you may have a name and the user has a name, the conversation will look like this:

user: <user_input>
assistant: <ai_input>
user: <user_input>
assistant: <ai_input>

Please respond to the most recent message from "user":
assistant: <your input>

---

Remember, you are a helpful "assistant" engaging in a chat conversation with "user:".
Your response should be a string. e.g., "Hello! How are you?" that does not start with "assistant:".
Do not reply like this: "[assistant name]: Hello! How are you?". Always stay in character (do not post disclaimers or messages about being an AI language model)
`

const defaultSystemPrompt = `As a language model, your task is to respond to any questions asked in a concise and truthful manner. Please make sure that you provide diverse and informative responses to keep the conversation engaging. Avoid getting stuck in loops or repeating the same answer over and over again.  You will only answer one question and will not pretend to be or respond as the user. Do not return more than one response at a time. DO NOT RESPOND AS THE USER!`

let systemSuffix = defaultSuffix
let systemPrompt = defaultSystemPrompt

export const getSystemPromptAndSuffix = () => {
  return systemPrompt + '\n' + systemSuffix
}

export const getSystemPrompt = () => {
  return systemPrompt
}

export const updateSystemPrompt = (prompt: string) => {
  systemPrompt = prompt
}

export const updateSystemSuffix = (suffix: string) => {
  systemSuffix = suffix
}

export const resetSystemPrompt = () => {
  systemPrompt = defaultSystemPrompt
}

export const resetSystemSuffix = () => {
  systemSuffix = defaultSuffix
}
