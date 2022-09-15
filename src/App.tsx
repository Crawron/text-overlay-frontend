import "@fontsource/inter/500.css"

import { messageHistory } from "./store"
import { useStore } from "@nanostores/react"
import { motion, AnimatePresence } from "framer-motion"

function App() {
	const historyList = useStore(messageHistory)

	return (
		<div className="w-screen h-screen flex p-20 align-bottom items-end gap-4">
			<div className="text-5xl animate-bounce leading-none">🦃</div>
			<div className="w-full flex flex-col place-content-end gap-2">
				<AnimatePresence>
					{historyList
						.filter((message) => message.text.trim())
						.map((item, i) => (
							<Bubble
								content={item.text}
								key={item.key}
								active={historyList.length - 1 === i}
							/>
						))}
				</AnimatePresence>
			</div>
		</div>
	)
}

function Bubble({ content, active }: { content: string; active?: boolean }) {
	return (
		<motion.div
			layout="preserve-aspect"
			className="max-w-full w-fit leading-none bg-black/70 rounded-lg text-white py-3 px-4 backdrop-blur-lg text-4xl font-medium break-words"
			style={{ wordBreak: "break-word" }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
		>
			{content}
			{active && <span className="animate-pulse text-white/50"> _</span>}
		</motion.div>
	)
}

export default App
