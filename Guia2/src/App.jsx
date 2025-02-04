import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header'
import { Footer } from './components/footer'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  function initialCart(){
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart) :[]
  }

  const[data, setData]=useState(db)

  const[cart, setCart]=useState(initialCart)

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))   
  },[cart])
  

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
    saveCartToLocalStorage(); //el estado en react es asincrona

  }

  function calculateTotal(){
    /*let total=0
    for (const guitar of cart) {
      total+=guitar.price*guitar.quantity;
    }*/
   let total=cart.reduce((total, item)=>total+item.price*item.quantity, 0)
    return total;
  }


  function aumentarCantidad(id) {
    const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function disminuirCantidad(id) {
      const updatedCart = cart
          .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);
      setCart(updatedCart);
  }
  function eliminarProducto(id) {
      const updatedCart = cart
          .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity = 0 } : item
          )
          .filter((item) => item.quantity > 0);
      setCart(updatedCart);
  }

  function vaciarCarrito() {
      setCart([]);
  }
  

  return (
    <>
    <Header cart={cart} total={calculateTotal()} 
    disminuirCantidad={disminuirCantidad} aumentarCantidad={aumentarCantidad}
    eliminarProducto={eliminarProducto} vaciarCarrito={vaciarCarrito}>
    </Header>

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
