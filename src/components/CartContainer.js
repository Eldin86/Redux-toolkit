import React from 'react'
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import {openModal} from '../features/modal/modalSlice'

const CartContainer = () => {
    const { cartItems, amount, total } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    if (amount < 1) {
        return <section className='cart'>
            <header>
                <h2>Your bag</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
        </section>
    }

    return (
        <section className='cart'>
            <header>
                <h2>Your bag</h2>
                <div>
                    {cartItems.map((el) => {
                        return (
                            <CartItem key={el.id} {...el} />
                        )
                    })}
                </div>
                <footer>
                    <hr />
                    <div className='cart-total'>
                        <h4>total <span>${total.toFixed(2)}</span></h4>
                    </div>
                    <button onClick={() => dispatch(openModal())} className='btn clear-btn'>Clear cart</button>
                </footer>
            </header>
        </section>
    )
}

export default CartContainer