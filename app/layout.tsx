/** @format */
import "@styles/global.scss"
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import { ReactNode } from "react"
import { getSession } from "next-auth/react" // Import getSession to fetch session

interface Metadata {
	title: string
	description: string
}

export const metadata: Metadata = {
	title: "PromptMaster",
	description: "Discover and Share AI Prompts",
}

interface RootLayoutProps {
	children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	const session = getSession() // Fetch the session

	return (
		<html lang="en">
			<body>
				<Provider session={session}>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}

export default RootLayout
