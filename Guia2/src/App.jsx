import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header'
import { Footer } from './components/footer'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  const[data, setData]=useState(db)
  

  return (
    <>
    <Header></Header>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">
            <Guitar></Guitar>
            <Guitar></Guitar>
        </div>
    </main>
    <Footer></Footer>
    </>
  )
}

export default App
