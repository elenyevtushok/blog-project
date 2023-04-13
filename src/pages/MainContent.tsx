import { Posts } from "../features/posts/Posts"
import { HeaderHero } from "./HeaderHero"

export const MainContent = () => {

	return (
		<>
		<HeaderHero />
		<main>
			<div className='content-title'>
				<div className="content-seperator"></div>
				<h1>Latest Posts in the blog</h1>
				<div className="content-seperator"></div>
				<p>Swipe to read all</p>
			</div>
			<Posts />
		</main>
		</>
	)
}
