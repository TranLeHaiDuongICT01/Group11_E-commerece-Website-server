import React, { useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import TransitionsModal from '../component/Modal'
import {
    Infor,
    Container,
    Image,
    Icon
} from './style-component/ProductItem'
const ProductItem = ({ item }) => {
    const [openModal, setOpenModal] = useState(false)
    const navi = useNavigate()
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        if (cart?.products?.findIndex(ele => ele?._id === item._id) !== -1) {
            return setOpenModal(true)
        }
        dispatch(addProduct({ ...item, quantity: 1 }))
    }
    return (
        <Container>
            <TransitionsModal text="You already add this product to cart" setOpenModal={setOpenModal} openModal={openModal} />
            <Image src={item.images[0]?.url} />
            <Infor>
                <Icon onClick={handleAddToCart}>
                    <ShoppingCartOutlinedIcon />
                </Icon>

                <Icon onClick={() => navi(`/product/${item._id}`)}>
                    <SearchIcon />
                </Icon>

                <Icon>
                    <FavoriteBorderOutlinedIcon />
                </Icon>
            </Infor>
        </Container>
    )
}

export default ProductItem