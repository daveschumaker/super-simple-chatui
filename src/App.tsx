import ReactTextareaAutosize from 'react-textarea-autosize'
import './App.css'

function App() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h1>Simple OpenAI UI</h1>
      <div className="card"></div>
      <div className="flex flex-row gap-2">
        <ReactTextareaAutosize
          id="message"
          maxRows={6}
          minRows={1}
          className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your message for ChatGPT"
        ></ReactTextareaAutosize>
      </div>
    </div>
  )
}

export default App
