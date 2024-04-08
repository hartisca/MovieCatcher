import './App.css'
import Rutas from './Rutas'
import Footer from './layout/Footer/Footer'
import HeroBanner from './layout/HeroBanner/HeroBanner'
import Header from './layout/HeroBanner/Header'
import Trending from './components/movies/Trending'

function App() {
  
  return (
    <div style={{scrollBehavior: 'smooth'}}>
      <Header />      
      <HeroBanner />
      <Rutas />
      <Footer />
    </div>
  )
}

export default App
