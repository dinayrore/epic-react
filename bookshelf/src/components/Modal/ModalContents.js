import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { CircleButton} from '../lib'
import Modal from './Modal'
import {ModalDismissButton} from '../../components/Buttons/ModalButtons'

const ModalContents = ({title, children, ...props}) => {
    return (
      <Modal {...props}>
        <div css={{display: 'flex', justifyContent: 'flex-end'}}>
          <ModalDismissButton>
            <CircleButton>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </CircleButton>
          </ModalDismissButton>
        </div>
        <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
        {children}
      </Modal>
    )
  }

export default ModalContents