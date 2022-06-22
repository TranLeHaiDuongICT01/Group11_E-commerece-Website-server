import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        currentPage: 1,
        numberOfPage: 1
    },
    reducers: {
        startFetching: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProducts: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products = action.payload.products
            state.currentPage = action.payload.currentPage
            state.numberOfPage = action.payload.numberOfPage
        },
        deleteProduct: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products = state.products.filter(product => product._id !== action.payload._id)
        },
        addProduct: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products.push(action.payload)
        },
        updateProduct: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products = state.products.map(product => product._id === action.payload._id ? action.payload : product)
        },
        fetchingError: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        resetError: (state) => {
            state.error = false
        },
        endFetching: (state) => {
            state.isFetching = false
            state.error = false
        }
    }
})
export const { startFetching, getProducts, deleteProduct, addProduct, updateProduct, fetchingError, resetError, endFetching } = productSlice.actions
export default productSlice.reducer