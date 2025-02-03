import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header'
import { Footer } from './components/footer'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  const[data, setData]=useState(db)

  const[cart, setCart]=useState([])

  function addToCart(guitar){
    const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    if(itemIndex===-1){ // ese articulo aun no existe en el carrito
      guitar.quantity=1;
      setCart([...cart,guitar])

    }
    else{ // si la guitarra ya se habia aniadido al carrito
      const updateCart=[...cart] // creando una copia de la vairbale de estado
      updateCart[itemIndex].quantity++;
      setCart(updateCart);

    }

  }
  

  return (
    <>
    <Header cart={cart}></Header>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">

          {data.map((guitar)=>(
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}></Guitar>
          ))}
        </div>
    </main>
    <Footer></Footer>
    </>
  )
}

export default App
