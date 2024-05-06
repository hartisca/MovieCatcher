import './App.css'
import Rutas from './Rutas'
import Footer from './layout/Footer/Footer'
import Header from './layout/HeroBanner/Header'

function App() { 

  return (
    <div className='appContainer' style={{scrollBehavior: 'smooth'}}>
      <Header />      
      <Rutas />
      <Footer />
    </div>
  )
}

export default App
