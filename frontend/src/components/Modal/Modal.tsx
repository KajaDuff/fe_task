import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';

type ModalProps = {
    handleClose: () => void
    isOpen: boolean
    handleConfirm: (id: string) => void
    attribute: { id: string, name: string }

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
                <Stack direction="row" spacing={2} sx={{ margin: "1rem" }}>
                    <Button onClick={handleClose} variant="contained" color="primary">Return</Button>
                    <Button onClick={() => handleConfirm(attribute.id)} autoFocus variant="contained" color="error" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>

    );
}
