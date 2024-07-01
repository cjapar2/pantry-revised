import React from 'react'
import '../styles/ItemListing.css'

export default function ItemListing({itemName, amount, comment}) {
  return (
    <div className='itemContainer'>
      <div className='name'>{itemName}</div>
      <div className='amount'>{amount}</div>
      <div className='comments'>{comment}</div>
    </div>
  )
}
