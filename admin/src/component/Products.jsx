import React, { useEffect } from 'react'
import ProductItem from './ProductItem'
import { Container } from './style-component/Products'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/apiCalls'
const Products = ({ category, filter, sort }) => {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    useEffect(() => {
        const { color, size } = filter
        getAllProducts(dispatch, category, color, size, sort)
    }, [category, filter, sort, dispatch])
    return (
        <Container>
            {
                products?.map(item => (
                    <ProductItem key={item._id} item={item} />
                ))
            }
        </Container>
    )
}

export default Products