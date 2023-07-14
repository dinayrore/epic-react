/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import {Dialog} from '../lib'
import {ModalContext} from 'contexts/modal.context'


const Modal = (props) => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}



export default Modal