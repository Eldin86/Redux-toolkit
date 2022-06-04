import React from 'react'
import { ChevronDown, ChevronUp } from '../icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, increase, decrease } from '../features/cart/cartSlice'

const CartItem = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch()

    return (
        <article className='cart-item'>
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className='item-rice'>${price}</h4>
                <button onClick={() => dispatch(removeItem(id))} className='remove-btn'>remove</button>
            </div>
            <div>
                <button onClick={() => dispatch(increase({id}))} className='amount-btn'>
                    <ChevronUp />
                </button>
                <p className='amount'>{amount}</p>
                <button disabled={amount === 1}  onClick={() => {dispatch(decrease({id}))}} className='amount-btn'>
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem