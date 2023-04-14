import './App.css'

import { Footer } from './pages/Footer'
import { MainContent } from './pages/MainContent'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom"
import { PostPage } from './features/posts/PostPage'

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<Router>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route path="/" element={<MainContent />} />
							<Route path="/posts/:id" element={<PostPage />} />
						</Routes>
					</QueryClientProvider>
					<Footer />
				</Provider>
			</Router>
		</>
	)
}

export default App





