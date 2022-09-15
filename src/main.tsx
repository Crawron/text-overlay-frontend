import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "./index.css"
import { commitMessage, backspaceMessage, typeInMessage } from "./store"

window.addEventListener("keydown", (ev) => {
	console.log(ev.code, ev.key)
	if (ev.key === "Enter") {
		commitMessage()
		return
	}

	if (ev.code === "Backspace") {
		backspaceMessage()
		return
	}

	if (ev.key.length > 1) return

	typeInMessage(ev.key)
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
