/** @format */
"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
const Nav = () => {
	const isUserLogIn: boolean = true

	const [providers, setProviders] = useState(null)
	const [toggleDropDown, setToggleDropDown] = useState(false)

	useEffect(() => {
		const setProviders = async () => {
			const responce = await getProviders()

			setProviders(responce)
		}

		setProviders()
	},[])

	return (
		<nav className="flex-between w-full md-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.png"
					alt="PromptHub Logo"
					width={150}
					height={150}
					className="object-contain"
				/>

				<p className="logo_text text-lg">PromtlyAI</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{isUserLogIn ? (
					<div className=" flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>

						<Link href="/profile">
							<Image
								src="/assets/images/logo.png"
								alt="profile picture"
								width={50}
								height={50}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									key={provider.name}
									type="button"
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}

			<div className="sm:hidden flex relative">
				{isUserLogIn ? (
					<div className="flex">
						<Image
							src="/assets/images/logo.png"
							alt="profile picture"
							width={50}
							height={50}
							className="rounded-full"
							onClick={() => setToggleDropDown(prev => !prev)}
						/>

						{toggleDropDown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									Create Prompt
								</Link>

								<button
									type="button "
									onClick={() => {
										setToggleDropDown(false)
										signOut()
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									key={provider.name}
									type="button"
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
