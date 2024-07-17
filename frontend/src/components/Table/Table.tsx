import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import {
	Box,
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
import { getAttributes } from 'src/api/api';
import { RoutesEnum } from 'src/constants/routes';
import { useNavigate } from 'react-router-dom';

type SortBy = "name" | "createdAt";
type SortDir = "asc" | "desc"
type TableProps = {
	data: Attribute[];
	labels: Label[];
	onRowClick: (id: string) => void;
	setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>
	onSearch: React.Dispatch<React.SetStateAction<string>>
	onDelete: (id: string, name: string) => void;
	onSort: React.Dispatch<React.SetStateAction<{
		sortBy: SortBy;
		sortDir: SortDir;
	}>>
	sortParams: { sortBy: SortBy, sortDir: SortDir }
}

const columnData = [
	{ id: "name", label: "Name" },
	{ id: "labels", label: "Labels" },
	{ id: "createdAt", label: "Created At" }
];

export const Table = ({ data, labels, onRowClick, onSearch, onDelete, onSort, setAttributes, sortParams }: TableProps) => {
	const [value, setValue] = useState<string>('')
	const tableEl = useRef<HTMLDivElement | null>(null)
	const [loading, setLoading] = useState(false)
	const [distanceBottom, setDistanceBottom] = useState(0)
	const [hasMore] = useState(true)
	const navigate = useNavigate();

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		// TODO: debouncer
		setValue(e.target.value)
		onSearch(e.target.value)
	}, [])

	const handleButtonClick = useCallback((event: { stopPropagation: () => void; }, id: string, name: string) => {
		event.stopPropagation(); // Stop the row click event
		onDelete(id, name)
	}, [onDelete])


	const handleSort = useCallback((sortBy: SortBy) => {
		const direction = sortParams.sortDir === "asc" ? "desc" : "asc"
		onSort({ sortBy, sortDir: direction })
	}, [sortParams.sortDir, onSort])

	// TODO:
	const loadMore = useCallback(() => {
		const loadItems = async () => {
			try {
				const responseAttributes = await getAttributes({ offset: data.length });
				const newAttributes = data.concat(responseAttributes.data)
				setAttributes(newAttributes);
				setLoading(false)
			} catch (error: any) {
				navigate(RoutesEnum.Error)

			}
		}
		setLoading(true)
		loadItems()
	}, [data])


	const scrollListener = useCallback(() => {
		if (tableEl.current) {
			let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight
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

		<TableContainer component={Paper} sx={{ maxWidth: '90vw', margin: 'auto', maxHeight: '800px', overflowX: 'scroll' }} ref={tableEl}>
			{loading && <CircularProgress style={{ position: 'absolute', top: '100px' }} />}
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
				<TableHead>
					<TableRow>
						{columnData.map(column => (
							<TableCell key={column.id}>
								{column.id !== "labels" ? (
									<TableSortLabel
										active={sortParams.sortBy === column.id}
										direction={sortParams.sortBy === column.id ? sortParams.sortDir : 'asc'}
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
					<TableRow sx={{ height: "50px" }}></TableRow>
				</TableBody>
			</MuiTable>
		</TableContainer>
	)
}
