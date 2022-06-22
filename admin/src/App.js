import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Announcement from './component/Announcement'
import Footer from './component/Footer'
import Navbar from './component/Navbar'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
import { logout } from './redux/userRedux'
let logoutTimer;
const App = () => {
  const { currentUser: user, loginDate } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const logoutFunc = useCallback(() => {
    dispatch(logout())
  }, [])
  useEffect(() => {
    if (loginDate) {
      const remainingTime = new Date(loginDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logoutFunc, remainingTime);
    } else  clearTimeout(logoutTimer)
  }, [])
  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <Navbar />
        <div style={{ marginTop: !user ? '0' : '80px' }}>
          <Announcement user={user} />
          <Routes>
            <Route exact path='/' element={!user ? <Navigate to='/login' replace /> : <Home />} />
            <Route exact path='/products' element={!user ? <Navigate to='/login' replace /> : <ProductList />} />
            <Route exact path='/product/:id' element={!user ? <Navigate to='/login' replace /> : <ProductDetails />} />
            <Route exact path='/login' element={user ? <Navigate to='/' replace /> : <Login />} />
            <Route exact path='/products/new' element={!user ? <Navigate to='/login' replace /> : <CreateProduct />} />
            <Route exact path='/product/edit/:id' element={!user ? <Navigate to='/login' replace /> : <EditProduct />} />
            <Route exact path='*' element={!user ? <Navigate to='/login' replace /> : <Navigate to='/' replace />} />
          </Routes>
          <Footer user={user} />
        </div>
      </Router>
    </div>
  )
}

export default App