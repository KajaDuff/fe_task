
import { deleteAttributeById, getAttributes, getLabels } from 'src/api/api';
import { useCallback, useEffect, useState } from 'react';
import { Table } from 'src/components/Table/Table';
import { useNavigate } from "react-router-dom";
import { useOpenHandler } from 'src/hooks/useOpenHandler';
import { Modal } from 'src/components/Modal/Modal';
import { Alert } from '@mui/material';



export const AttributesPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [selectedAttribute, setSelectedAttribute] = useState<{ id: string, name: string }>({ id: "", name: "" })
    const [deletedAttribute, setDeletedAttribute] = useState<string | null>(null)

    const navigate = useNavigate();
    const { isOpen, handleOpen, handleClose } = useOpenHandler()

    useEffect(() => {
        async function fetchData() {
            try {
                const responseAttributes = await getAttributes({ searchText: searchValue });
                setAttributes(responseAttributes.data);
                const labelsResponse = await getLabels()
                setLabels(labelsResponse.data)
            } catch (error: any) {
                // TODO: 
                console.error(error)
            }
        }
        fetchData();
    }, [searchValue]);


    const onRowClick = useCallback((id: string) => {
        // TODO: routes enum
        navigate(`/attributes/${id}`);
    }, [])

    const handleOpenModal = useCallback((id: string, name: string) => {
        setSelectedAttribute({ id, name })
        handleOpen()
    }, [selectedAttribute])

    const handleDeletion = useCallback((id: string) => {
        async function deleteData(id: string) {
            try {
                const deletedAttribute = await deleteAttributeById(id)
                setDeletedAttribute(deletedAttribute.data.name)
                // close modal
                handleClose()
            }
            catch (error: any) {
                // TODO: 
                console.error(error)
            }
        }
        deleteData(id)
    }, [])



    return (
        <>
            {deletedAttribute && <Alert severity="success" sx={{ marginBlock: "1rem" }} onClose={() => setDeletedAttribute(null)}>{`Attribute "${deletedAttribute}" deleted succesfully`}</Alert>}
            <Table data={attributes} labels={labels} onRowClick={onRowClick} onSearch={setSearchValue} onDelete={handleOpenModal} />
            <Modal isOpen={isOpen} handleClose={handleClose} handleConfirm={handleDeletion} attribute={selectedAttribute} />
        </>

    )
}