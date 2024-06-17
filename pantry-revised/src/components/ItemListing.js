import React from 'react'
import '../styles/ItemListing.css'

export default function ItemListing({itemName, amount, comment}) {
  return (
    <div className='itemContainer'>
      <p className='name'>{itemName}</p>
      <p className='amount'>{amount}</p>
      <p className='comments'>{comment}</p>
    </div>
  )
}
