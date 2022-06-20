import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Announcement from './component/Announcement'
import Footer from './component/Footer'
import Navbar from './component/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Success from './pages/Success'
import userRequest from './config'
import { getUserCart } from './redux/cartRedux'
const App = () => {
  const { currentUser: user, isFetching } = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      const getCart = async () => {
        const response = await userRequest.get('/carts/usercart')
        dispatch(getUserCart(response?.data?.products))
      }
      getCart()
    }
  }, [user, isFetching, dispatch])
  useEffect(() => {
    if (user) {
      const updateCart = async () => {
        await userRequest.patch('/carts/usercart', {
          products: cart.products
        })
      }
      updateCart()
    }
  }, [cart, user])
  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <Navbar />
        <div style={{ marginTop: '80px' }}>
          <Announcement />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/products' element={<ProductList />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/login' element={
              user ? <Navigate to='/' replace /> : <Login />
            } />
            <Route exact path='/register' element={
              user ? <Navigate to='/' replace /> : <Register />
            } />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/success' element={<Success />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App