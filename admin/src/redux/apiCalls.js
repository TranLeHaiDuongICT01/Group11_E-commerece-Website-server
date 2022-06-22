import userRequest, { publicRequest, BASE_URL } from "../config"
import * as api from "./productRedux"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from 'axios'
export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const response = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(response.data))
        window.location.reload()
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.msg || 'Something went wrong'))
    }
}
export const register = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const response = await publicRequest.post('/auth/register', user)
        dispatch(loginSuccess(response.data))
        window.location.reload()
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.msg || 'Something went wrong'))
    }
}

export const getAllProducts = async (dispatch, category, color, size, sort, page) => {
    dispatch(api.startFetching())
    try {
        const response = await publicRequest.get(`/products/all?page=${page || 1}&category=${category ? category : ''}&color=${color ? color.toLowerCase() : ''}&size=${size ? size : ''}&sort=${sort ? sort === 'newest' ? '-createdAt' : sort : ''}`)
        dispatch(api.getProducts(response?.data))
    } catch (error) {
        dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}
export const updateProduct = async (dispatch, id, product, setOpenModal) => {
    const { _id, ...others } = product
    dispatch(api.startFetching())
    try {
        const response = await userRequest.patch(`/products/product/${id}`, others)
        dispatch(api.updateProduct(response?.data))
        setOpenModal(true)
    } catch (error) {
        dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}

export const addProduct = async (dispatch, product) => {
    dispatch(api.startFetching())
    try {
        const response = await userRequest.post(`/products/new`, product)
        dispatch(api.addProduct(response?.data))
    } catch (error) {
        dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}

export const deleteProduct = async (dispatch, id) => {
    dispatch(api.startFetching())
    try {
        const response = await userRequest.delete(`/products/product/${id}`)
        dispatch(api.deleteProduct(response?.data))
    } catch (error) {
        dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}

export const uploadImage = async (dispatch, fileImages, token, data) => {
    dispatch(api.startFetching())
    try {
        for (let i = 0; i < fileImages.length; i++) {
            const formData = new FormData()
            formData.append('file', fileImages[i])
            const { data: imageData } = await axios.post(`${BASE_URL}/image/upload`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: 'Bearer ' + token
                }
            })
            data.images.push(imageData)
        }
        addProduct(dispatch, data)
        dispatch(api.endFetching())
    } catch (error) {
        dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}
// export const getAllProducts = async (dispatch, category, color, size, sort) => {
// dispatch(api.startFetching())
//     try {
//         const response = await publicRequest.get(`/products/all?category=${category ? category : ''}&color=${color ? color.toLowerCase() : ''}&size=${size ? size : ''}&sort=${sort ? sort === 'newest' ? '-createdAt' : sort : ''}`)
//         dispatch(api.getProducts(response?.data))
//     } catch (error) {
//         dispatch(api.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
//     }