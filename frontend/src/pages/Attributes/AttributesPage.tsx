
import { deleteAttributeById, getAttributes, getLabels } from 'src/api/api'
import { useCallback, useEffect, useState } from 'react'
import { Table } from 'src/components/Table/Table'
import { useNavigate } from 'react-router-dom'
import { useOpenHandler } from 'src/hooks/useOpenHandler'
import { Modal } from 'src/components/Modal/Modal'
import { Alert } from '@mui/material'
import { RoutesEnum } from 'src/constants/routes'
import { Attribute, Label, SortBy, SortDir } from 'src/types/ApiTypes'


export const AttributesPage = () => {

    const navigate = useNavigate()
    const { isOpen, handleOpen, handleClose } = useOpenHandler()


    const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchText') ?? '')
    const [attributes, setAttributes] = useState<Attribute[]>([])
    const [labels, setLabels] = useState<Label[]>([])
    const [selectedAttribute, setSelectedAttribute] = useState<{ id: string, name: string }>({ id: '', name: '' })
    const [sortParams, setSortParams] = useState<{ sortBy: 'name' | 'createdAt', sortDir: 'asc' | 'desc' }>({ sortBy: 'name', sortDir: 'asc' })
    const [deletedAttribute, setDeletedAttribute] = useState<string | null>(null)

    const searchText = localStorage.getItem('searchText') ?? searchValue
    const sortBy = localStorage.getItem('sortBy') as SortBy ?? sortParams.sortBy
    const sortDir = localStorage.getItem('sortDir') as SortDir ?? sortParams.sortDir



    useEffect(() => {
        async function fetchAttributes() {
            try {
                const query = { searchText, sortBy, sortDir }
                const responseAttributes = await getAttributes(query)
                setAttributes(responseAttributes.data)

            } catch (error: any) {
                navigate(RoutesEnum.Error)
            }
        }
        fetchAttributes()
    }, [searchText, sortBy, sortDir, navigate, deletedAttribute])

    useEffect(() => {
        async function fetchLabels() {
            try {
                const labelsResponse = await getLabels()
                setLabels(labelsResponse.data)
            } catch (error: any) {
                navigate(RoutesEnum.Error)
            }
        }
        fetchLabels()
    }, [navigate])


    const onRowClick = useCallback((id: string) => {
        navigate(`${RoutesEnum.Atribbutes}/${id}`)
    }, [navigate])

    const handleOpenModal = useCallback((id: string, name: string) => {
        setSelectedAttribute({ id, name })
        handleOpen()
    }, [handleOpen])

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
    }, [navigate, handleClose])


    return (
        <>
            {deletedAttribute && <Alert severity="success" sx={{ marginBlock: '1rem' }} onClose={() => setDeletedAttribute(null)}>{`Attribute "${deletedAttribute}" deleted succesfully`}</Alert>}
            <Table data={attributes} labels={labels} onRowClick={onRowClick} onSearch={setSearchValue} onDelete={handleOpenModal} onSort={setSortParams} sortParams={sortParams} setAttributes={setAttributes} />
            <Modal isOpen={isOpen} handleClose={handleClose} handleConfirm={handleDeletion} attribute={selectedAttribute} />
        </>

    )
}