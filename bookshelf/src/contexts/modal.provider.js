import React, { useState } from 'react'
import { ModalContext } from 'contexts/modal.context'

export const ModalProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}