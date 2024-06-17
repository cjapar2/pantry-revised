import React from 'react'
import '../styles/ItemListing.css'

export default function ItemListing({itemName, amount, comment}) {
  return (
    <div className="itemContainer">{itemName}</div>
  )
}
