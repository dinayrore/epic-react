import {useState} from 'react'

export const useModal = () => {
    // @reach/dialog modal component uses none for false state
    const [openModal, setOpenModal] = useState('none')
    
    return {
        openModal,
        setOpenModal
    }
}