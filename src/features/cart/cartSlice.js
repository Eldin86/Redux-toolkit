import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
//import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-projec'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
        try {
            console.log('name', name)//Parameter from component in App.js
            console.log('thunkAPI', thunkAPI)
            const resp = await axios(url)
            return resp.data
        } catch (error) {
            //Handle Errors
            return thunkAPI.rejectWithValue('Something went wrong')
        }
    })

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
            // return {
            //     ...state,
            //     cartItems: []
            // }
        },
        removeItem: (state, { payload }) => {
            console.log('action', payload)
            //Payload is item ID
            const updatedItems = state.cartItems.filter(el => el.id !== payload)
            state.cartItems = updatedItems
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find(el => el.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find(el => el.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(' [getCartItems.fulfilled]', action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state, action) => {//We pass error from api as action to handle error
            state.isLoading = false
            console.log('error action', action)//Log error from API
        }
    }
})

console.log('cartslice', cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions

export default cartSlice.reducer