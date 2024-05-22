# Super Simple ChatUI

![Super Simple ChatUI Screenshot](/docs/screenshot.png)

## Overview

_Super Simple ChatUI_ is a React/TypeScript project that provides a simple and intuitive frontend UI for interacting with a local LLM (Large Language Model) on through [Ollama](https://github.com/ollama/ollama). This project enables users to interact with their own LLMs locally, ensuring privacy and control over their data.

This project was setup using [Vite](https://vitejs.dev/), which allows for rapid development thanks to features like Hot Module Replacement, support for TypeScript, CSS modules and more.

## Installation

### Prerequisites

- Node (v18.17.0 or later)
- Ollama

### Steps

1. Clone the repository

```bash
> git clone https://github.com/daveschumaker/super-simple-chatui.git
> cd super-simple-chatui
```

2. Install dependencies

```bash
> npm install
```

3. Run development server

```bash
> npm run dev
```

4. Access application by visiting the link in your terminal (I believe Vite uses: [http://localhost:5173](http://localhost:5173))

### Usage

1. Ensure that Ollama is running on your machine and exposes its API at: `http://localhost:11434`
2. Interact with LLM: Use the super-simple-chatui interface to send queries to Ollama and receive responses.

## TODOs

- Add support for IndexedDb via Dexie (longer term storage for conversations, system prompts, various settings, etc)
- Add support for picking from available models via Ollama
- Add support for chatting with models via the [AI Horde](https://horde.koboldai.net/)
- Add support for OpenAI's ChatGPT API via API key
- Write tests! Always with the tests.

### Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Acknowledgments

- Chat logo / favicon via Flaticon: [Bubble Chat free icon](https://www.flaticon.com/free-icon/chat_9356600)
- [Ollama](https://github.com/ollama/ollama)
- [Vite](https://vitejs.dev/)
