import './App.css'

import { Footer } from './pages/Footer'
import { MainContent } from './pages/MainContent'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HeaderHero } from './pages/HeaderHero'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<HeaderHero />
					<MainContent />
					<Footer />
				</QueryClientProvider>
			</Provider>
		</>
	)
}

export default App





