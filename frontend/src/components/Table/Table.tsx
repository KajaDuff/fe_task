import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import {
	Button,
	Input,
	InputAdornment,
	Table as MuiTable,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'

type TableProps = {
	data: Attribute[];
	labels: Label[];
	onRowClick: (id: string) => void;
	onSearch: React.Dispatch<React.SetStateAction<string>>
	onDelete: (id: string, name: string) => void;
}


export const Table = ({ data, labels, onRowClick, onSearch, onDelete }: TableProps) => {
	const [value, setValue] = useState<string>('')

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		// TODO: debouncer
		setValue(e.target.value)
		onSearch(e.target.value)
	}, [])

	const handleButtonClick = useCallback((event: { stopPropagation: () => void; }, id: string, name: string) => {
		event.stopPropagation(); // Stop the row click event
		onDelete(id, name)
	}, [onDelete])


	const tableRows = useMemo(() => {
		return data.map((row) => {
			// get label names based on ids
			const labelNames = row.labelIds.map(labelId => {
				return labels.find((e) => e.id === labelId)?.name
			});

			return <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => onRowClick(row.id)}>
				<TableCell align="left">{row.name}</TableCell>
				<TableCell component="th" scope="row">{labelNames.join(', ')}</TableCell>
				<TableCell component="th" scope="row">{row.createdAt}</TableCell>
				<TableCell align="right">
					<Button onClick={(e) => handleButtonClick(e, row.id, row.name)}>
						Delete
					</Button>
				</TableCell>
			</TableRow>
		}


		)
	}, [data, onRowClick])

	return (
		<TableContainer component={Paper}>
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Labels</TableCell>
						<TableCell>Created At</TableCell>
						<TableCell align="right">
							<Input
								autoComplete="off"
								value={value}
								placeholder="Search..."
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								onChange={onChange}
							/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tableRows}
				</TableBody>
			</MuiTable>
		</TableContainer>
	)
}
