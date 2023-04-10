import { Posts } from "../features/posts/Posts"

export const MainContent = () => {

	return (
		<main>
			<div className='content-title'>
				<div className="content-seperator"></div>
				<h1>Latest Posts in the blog</h1>
				<div className="content-seperator"></div>
				<p>Swipe to read all</p>
			</div>
			<Posts />
		</main>
	)
}
