import { ModalContext } from 'contexts/modal.context'
import { useContext, cloneElement } from 'react'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = useContext(ModalContext)
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = useContext(ModalContext)
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

export {ModalDismissButton, ModalOpenButton}