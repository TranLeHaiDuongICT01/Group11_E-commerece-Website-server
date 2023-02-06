import userRequest, { publicRequest } from "../config"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { startFetching, getProducts, fetchingError } from "./productRedux"
import * as orderApi from './orderRedux';
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
    dispatch(startFetching())
    try {
        const response = await publicRequest.get(`/products/all?page=${page || 1}&category=${category ? category : ''}&color=${color ? color.toLowerCase() : ''}&size=${size ? size : ''}&sort=${sort ? sort === 'newest' ? '-createdAt' : sort : ''}`)
        dispatch(getProducts(response?.data))
    } catch (error) {
        dispatch(fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}

export const getUserOrder = async (dispatch) => {
    dispatch(orderApi.startFetching())
    try {
        const response = await userRequest.get('/orders/userorder');
        dispatch(orderApi.getOrders(response?.data));
    } catch (error) {
        dispatch(orderApi.fetchingError(error?.response?.data?.msg || 'Something went wrong'))
    }
}