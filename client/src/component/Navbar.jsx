import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Shop2Icon from '@mui/icons-material/Shop2';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';
import { emptyCart } from '../redux/cartRedux';
import {
    NavbarItems,
    Logo,
    MenuIconContainer,
    Menu,
    MenuItem
} from './style-component/Navbar'
const Navbar = () => {
    const cart = useSelector(state => state.cart)
    const { currentUser: user } = useSelector(state => state.user)
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = () => {
        setClicked(!clicked)
    }
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(emptyCart())
        setClicked(false)
    }
    return (
        <NavbarItems>
            <Logo onClick={() => navigate('/')}><Shop2Icon style={{ marginRight: '10px' }} /> Shopping</Logo>
            <MenuIconContainer onClick={handleClick}>
                {
                    clicked ? <CloseIcon style={{ fontSize: '25px' }} /> : <MenuIcon style={{ fontSize: '25px' }} />
                }
            </MenuIconContainer>
            <Menu active={clicked} user={!!user}>
                <MenuItem onClick={() => setClicked(false)}>
                    <Link className='nav-menu-link' to='/'>Home</Link>
                </MenuItem>
                <MenuItem onClick={() => setClicked(false)}>
                    <Link className='nav-menu-link' to='/products'>Products</Link>
                </MenuItem>
                <MenuItem onClick={() => setClicked(false)}>
                    <Link className='nav-menu-link' to='/cart'>
                        <Badge badgeContent={`${cart?.products.length}`} color='error'>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </Link>
                </MenuItem>
                {!user ?
                    <>
                        <MenuItem onClick={() => setClicked(false)}>
                            <Link className='nav-menu-link' to='/login'>Login</Link>
                        </MenuItem>
                        <MenuItem onClick={() => setClicked(false)}>
                            <Link className='nav-menu-link' to='/register'>Register</Link>
                        </MenuItem>
                    </> :
                    <>
                        <MenuItem onClick={handleLogout}>
                            <Link className='nav-menu-link' to='/'>Logout</Link>
                        </MenuItem>
                        <MenuItem onClick={() => setClicked(false)}>
                            <Link className='nav-menu-link' to='/history'>Order History</Link>
                        </MenuItem>
                        {/* <MenuItem>
                            <p>
                                <i className="far fa-address-card"></i>&nbsp; {userAddress}
                            </p>
                            <p>
                                <i className="fas fa-piggy-bank"></i>&nbsp;
                                {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
                            </p>
                        </MenuItem> */}
                    </>
                }
            </Menu>
        </NavbarItems>
    )
}

export default Navbar