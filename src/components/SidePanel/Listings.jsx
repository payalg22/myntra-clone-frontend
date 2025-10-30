import React from 'react'

export default function Listings({label, quantity}) {
  return (
    <div>
        <input type='checkbox' />
        <span>{label}</span>
        <span>{"(" + quantity + ")"}</span>
    </div>
  )
}
