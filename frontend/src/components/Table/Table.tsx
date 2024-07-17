import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import {
	Button,
	CircularProgress,
	Input,
	InputAdornment,
	Table as MuiTable,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { getAttributes } from 'src/api/api'
import { RoutesEnum } from 'src/constants/routes'
import { useNavigate } from 'react-router-dom'
import { Attribute, Label, SortBy, SortDir } from 'src/types/ApiTypes'




type TableProps = {
	data: Attribute[];
	labels: Label[];
	onDelete: (id: string, name: string) => void;
	onRowClick: (id: string) => void;
	onSearch: React.Dispatch<React.SetStateAction<string>>
	onSort: React.Dispatch<React.SetStateAction<{
		sortBy: SortBy;
		sortDir: SortDir;
	}>>,
	setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>,
	sortParams: { sortBy: SortBy, sortDir: SortDir }
}

const columnData = [
	{ id: 'name', label: 'Name' },
	{ id: 'labels', label: 'Labels' },
	{ id: 'createdAt', label: 'Created At' }
]

export const Table = ({ data, labels, onRowClick, onSearch, onDelete, onSort, setAttributes, sortParams }: TableProps) => {

	const searchText = localStorage.getItem('searchText')
	const sortBy = localStorage.getItem('sortBy') as SortBy ?? sortParams.sortBy
	const sortDir = localStorage.getItem('sortDir') as SortDir ?? sortParams.sortDir

	const [value, setValue] = useState<string>(searchText ?? '')
	const tableEl = useRef<HTMLDivElement | null>(null)
	const [loading, setLoading] = useState(false)
	const [distanceBottom, setDistanceBottom] = useState(0)
	const [hasMore] = useState(true)
	const navigate = useNavigate()

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		onSearch(e.target.value)
		localStorage.setItem('searchText', e.target.value)
	}, [onSearch])

	const handleButtonClick = useCallback((event: { stopPropagation: () => void; }, id: string, name: string) => {
		event.stopPropagation() // Stop the row click event
		onDelete(id, name)
	}, [onDelete])


	const handleSort = useCallback((sortBy: SortBy) => {
		const direction = sortParams.sortDir === 'asc' ? 'desc' : 'asc'
		onSort({ sortBy, sortDir: direction })
		localStorage.setItem('sortBy', sortBy)
		localStorage.setItem('sortDir', direction)
	}, [sortParams.sortDir, onSort])


	const loadMore = useCallback(() => {
		const loadItems = async () => {
			try {
				const responseAttributes = await getAttributes({ offset: data.length, searchText: value, sortBy: sortParams.sortBy, sortDir: sortParams.sortDir })
				const newAttributes = data.concat(responseAttributes.data)
				setAttributes(newAttributes)
				setLoading(false)
			} catch (error: any) {
				navigate(RoutesEnum.Error)

			}
		}
		setLoading(true)
		loadItems()
	}, [data, navigate, setAttributes, sortParams.sortBy, sortParams.sortDir, value])


	const scrollListener = useCallback(() => {
		if (tableEl.current) {
			const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight
			if (!distanceBottom) {
				setDistanceBottom(Math.round(bottom * 0.2))
			}
			if (tableEl.current.scrollTop > bottom - distanceBottom && hasMore && !loading) {
				loadMore()
			}
		}
	}, [hasMore, loadMore, loading, distanceBottom])

	useLayoutEffect(() => {
		const tableRef = tableEl.current
		if (tableRef) {
			tableRef.addEventListener('scroll', scrollListener)
			return () => {
				tableRef.removeEventListener('scroll', scrollListener)
			}
		}
	}, [scrollListener])



	const tableRows = useMemo(() => {
		return data.map((row) => {
			// get label names based on ids
			const labelNames = row.labelIds.map(labelId => {
				return labels.find((e) => e.id === labelId)?.name
			})

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
	}, [data, labels, onRowClick, handleButtonClick])





	return (

		<TableContainer component={Paper} sx={{ margin: 'auto', maxHeight: '800px', maxWidth: '90vw', overflowX: 'scroll' }} ref={tableEl}>
			{loading && <CircularProgress style={{ position: 'absolute', top: '100px' }} />}
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
				<TableHead>
					<TableRow>
						{columnData.map(column => (
							<TableCell key={column.id}>
								{column.id !== 'labels' ? (
									<TableSortLabel
										active={sortBy === column.id}
										direction={sortBy === column.id ? sortDir : 'asc'}
										onClick={() => handleSort(column.id as SortBy)}
									>
										{column.label}
									</TableSortLabel>
								) : (
									column.label
								)}
							</TableCell>
						))}
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
					<TableRow sx={{ height: '50px' }}></TableRow>
				</TableBody>
			</MuiTable>
		</TableContainer>
	)
}
