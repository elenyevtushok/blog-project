import './App.css'
import { Footer } from './pages/Footer'
import { MainContent } from './pages/MainContent'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HeaderHero } from './pages/HeaderHero'

function App() {

	return (
		<>
			<Provider store={store}>
				<HeaderHero />
				<MainContent />
				<Footer />
			</Provider>
		</>
	)
}

export default App
