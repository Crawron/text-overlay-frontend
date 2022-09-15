import { atom, action, computed } from "nanostores"

export type Message = { key: string; text: string }

export const messageHistory = atom<Message[]>([])

export function getCurrentMessage(): Message {
	const history = messageHistory.get()
	return history[history.length - 1] ?? { key: crypto.randomUUID(), text: "" }
}

export function setCurrentMessage(func: (current: string) => string) {
	const history = messageHistory.get()
	const current = getCurrentMessage()
	messageHistory.set([
		...history.slice(0, history.length - 1), // every message but the last
		{ key: current.key, text: func(current.text) },
	])
}

export function typeInMessage(text: string) {
	setCurrentMessage((m) => m + text)
}

export function commitMessage() {
	messageHistory.set([
		...messageHistory.get(),
		{ key: crypto.randomUUID(), text: "" },
	])
}

export function backspaceMessage() {
	setCurrentMessage((m) => m.slice(0, m.length - 1))
}
