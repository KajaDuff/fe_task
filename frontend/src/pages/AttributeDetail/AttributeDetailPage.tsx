import { Alert, Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteAttributeById, getAttributeById, getLabels } from 'src/api/api';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { Modal } from 'src/components/Modal/Modal';
import { useOpenHandler } from 'src/hooks/useOpenHandler';



export const AttributeDetailPage = () => {
    const [data, setData] = useState<Attribute>()
    const [formattedDate, setFormattedDate] = useState<string>()
    const [labels, setLabels] = useState<Label[]>([]);
    const [deletedAttribute, setDeletedAttribute] = useState<string | null>(null)

    let { id } = useParams();
    const navigate = useNavigate();
    const { isOpen, handleOpen, handleClose } = useOpenHandler()

    useEffect(() => {
        if (!id) return
        async function fetchData() {
            try {
                const responseAttribute = await getAttributeById(id);
                const labelsResponse = await getLabels()
                setData(responseAttribute.data);
                setFormattedDate(new Date(responseAttribute.data.createdAt).toLocaleString())
                setLabels(labelsResponse.data)
            } catch (error: any) {
                // TODO: 
                console.error(error)
            }
        }
        fetchData();
    }, [id]);

    const labelNames = useMemo(() => {
        if (!data) return
        const names = data.labelIds.map(labelId => {
            return labels.find((e) => e.id === labelId)?.name
        });
        return names.join(", ")
    }, [data, labels])

    const handleStepBack = useCallback(() => {
        // TODO: routes enum
        navigate(`/attributes`);
    }, [navigate])


    const handleDeletion = useCallback((id: string) => {
        async function deleteData(id: string) {
            try {
                const deletedAttribute = await deleteAttributeById(id)
                setDeletedAttribute(deletedAttribute.data.name)
                // close modal
                handleClose()
                navigate(`/attributes`);
            }
            catch (error: any) {
                // TODO: 
                console.error(error)
            }
        }
        deleteData(id)
    }, [])


    if (!data) return
    return (
        <Container sx={{ justifyContent: "center", alignItems: "center", overflow: "hidden", display: "flex", flexDirection: "column" }}>

            <div>
                <Typography variant='h4' sx={{ marginBlockEnd: "1rem" }}>
                    {data?.name}
                </Typography>
                <Typography>Created at: {formattedDate}</Typography>
                <Typography>Labels: {labelNames}</Typography>
            </div>
            <Stack direction="column" spacing={2} sx={{ margin: "2rem" }}>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleOpen}>
                    Delete
                </Button>
                <Button variant="outlined" color="primary" startIcon={<ReplyIcon />} onClick={handleStepBack}>
                    Back to list of attributes
                </Button>
            </Stack>
            <Modal isOpen={isOpen} handleClose={handleClose} handleConfirm={handleDeletion} attribute={{ id: data.id, name: data.name }} />
        </Container>
    )
}
