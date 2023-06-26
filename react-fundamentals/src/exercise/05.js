// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// 🐨 add a className prop to each div and apply the correct class names
// 🐨 add a style prop to each div so their background color
// 🐨 also use the style prop to make the font italic
const smallBox = <div className='box--small' style={{backgroundColor:"lightblue", fontStyle: "italic"}}>small lightblue box</div>
const mediumBox = <div className='box--medium' style={{backgroundColor:"pink", fontStyle: "italic"}}>medium pink box</div>
const largeBox = <div className='box--large' style={{backgroundColor:"orange", fontStyle: "italic"}}>large orange box</div>


// 💯 Create a custom component
// 💯 Accept a size prop to encapsulate styling
const Box = ({size, style, children}) => {
  const sizeClassName = size && `box--${size}` 
  return (
    <div className={`box ${sizeClassName}`}  style={{...style, fontStyle: "italic"}}>
      {children}
    </div>
  )
}

function App() {
  return (
    <div>
      <Box size="small" style={{backgroundColor:"lightblue"}}>small lightblue box</Box>
      <Box size="medium"  style={{backgroundColor:"pink"}}>medium pink box</Box>
      <Box size="large" style={{backgroundColor:"orange"}}>large orange box</Box>
      <Box>sizeless box</Box>
    </div>
  )
}

export default App
