import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { publicRequest } from '../config'
import { Container } from './style-component/Products'
const Products = ({ category, filter, sort }) => {

    const [products, setProducts] = useState([])
    const [currentOfPage, setCurrentOfPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    useEffect(() => {
        const { color, size } = filter

        const getProducts = async () => {
            try {
                const data = await publicRequest.get(`/products/all?category=${category ? category : ''}&color=${color ? color.toLowerCase() : ''}&size=${size ? size : ''}&sort=${sort ? sort === 'newest' ? '-createdAt' : sort : ''}`)
                const { products, currentPage, numberOfPage } = data.data
                setCurrentOfPage(currentPage)
                setTotalPage(numberOfPage)
                setProducts(products)
            } catch (error) {

            }
        }
        getProducts()
    }, [category, filter, sort])
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