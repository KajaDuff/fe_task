
import { getAttributes, getLabels } from 'src/api/api';
import { Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Table } from 'src/components/Table/Table';
import { useNavigate } from "react-router-dom";



export const AttributesPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);

    const navigate = useNavigate();

    console.log("search", searchValue)


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
        console.log("id", id)
        // TODO: routes enum
        navigate(`/attributes/${id}`);
    }, [])

    const onDelete = useCallback((id: string) => {
        // TODO: open modal
        console.log("id", id)
    }, [])


    return (

        <Paper>
            <Table data={attributes} labels={labels} onRowClick={onRowClick} onSearch={setSearchValue} onDelete={onDelete} />
        </Paper>

    )
}