import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "./index.css"
import { commitMessage, backspaceMessage, typeInMessage } from "./store"

const ws = new WebSocket("ws://127.0.0.1:2100")

type WSMessageKey = {
	type: "Key"
	key: string
	modifiers: string[]
	code: number
}

type WSMessageText = {
	type: "Text"
	value: string
}

type WSMessage = WSMessageKey | WSMessageText

ws.addEventListener("message", (ev) => {
	const message = JSON.parse(ev.data) as WSMessage

	if (message.type === "Key") {
		switch (message.key) {
			case "Escape":
			case "Super_L":
			case "Super_R":
			case "Tab":
				ws.send(JSON.stringify({ type: "Grab", enabled: false }))
			case "Return":
				commitMessage()
				return
			case "BackSpace":
				backspaceMessage()
			default:
				return
		}
	}

	if (JSON.stringify(message.value).startsWith('"\\')) return

	typeInMessage(message.value)
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
