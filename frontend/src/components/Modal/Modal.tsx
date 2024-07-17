import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/material'

type ModalProps = {
    attribute: { id: string, name: string },
    handleClose: () => void,
    handleConfirm: (id: string) => void
    isOpen: boolean

}

export const Modal = ({ handleClose, handleConfirm, isOpen, attribute }: ModalProps) => {

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" >
                {`Delete the attribute "${attribute.name}" with ID ${attribute.id}?`}
            </DialogTitle>
            <DialogActions>
                <Stack direction="row" spacing={2} sx={{ margin: '1rem' }}>
                    <Button onClick={handleClose} variant="contained" color="primary">Return</Button>
                    <Button onClick={() => handleConfirm(attribute.id)} autoFocus variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>

    )
}
