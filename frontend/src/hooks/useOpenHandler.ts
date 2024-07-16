import { useCallback, useState } from 'react'

export const useOpenHandler = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])


  return { handleClose, handleOpen, isOpen }
}
