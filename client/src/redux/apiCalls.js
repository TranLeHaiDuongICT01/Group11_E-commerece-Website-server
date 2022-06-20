import { publicRequest } from "../config"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

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