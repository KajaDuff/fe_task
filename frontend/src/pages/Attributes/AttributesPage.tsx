
import { deleteAttributeById, getAttributes, getLabels } from 'src/api/api';
import { useCallback, useEffect, useState } from 'react';
import { Table } from 'src/components/Table/Table';
import { useNavigate } from "react-router-dom";
import { useOpenHandler } from 'src/hooks/useOpenHandler';
import { Modal } from 'src/components/Modal/Modal';
import { Alert } from '@mui/material';
import { RoutesEnum } from 'src/constants/routes';



export const AttributesPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [selectedAttribute, setSelectedAttribute] = useState<{ id: string, name: string }>({ id: "", name: "" })
    const [sortParams, setSortParams] = useState<{ sortBy: "name" | "createdAt", sortDir: "asc" | "desc" }>({ sortBy: "name", sortDir: "asc" })
    const [deletedAttribute, setDeletedAttribute] = useState<string | null>(null)

    const navigate = useNavigate();
    const { isOpen, handleOpen, handleClose } = useOpenHandler()

    useEffect(() => {
        async function fetchData() {
            try {
                const responseAttributes = await getAttributes({ searchText: searchValue, sortBy: sortParams.sortBy, sortDir: sortParams.sortDir });
                setAttributes(responseAttributes.data);
                const labelsResponse = await getLabels()
                setLabels(labelsResponse.data)
            } catch (error: any) {
                navigate(RoutesEnum.Error)
            }
        }
        fetchData();
    }, [searchValue, sortParams.sortDir]);


    const onRowClick = useCallback((id: string) => {
        navigate(`${RoutesEnum.Atribbutes}/${id}`);
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
                navigate(RoutesEnum.Error)
            }
        }
        deleteData(id)
    }, [])



    return (
        <>
            {deletedAttribute && <Alert severity="success" sx={{ marginBlock: "1rem" }} onClose={() => setDeletedAttribute(null)}>{`Attribute "${deletedAttribute}" deleted succesfully`}</Alert>}
            <Table data={attributes} labels={labels} onRowClick={onRowClick} onSearch={setSearchValue} onDelete={handleOpenModal} onSort={setSortParams} sortParams={sortParams} />
            <Modal isOpen={isOpen} handleClose={handleClose} handleConfirm={handleDeletion} attribute={selectedAttribute} />
        </>

    )
}