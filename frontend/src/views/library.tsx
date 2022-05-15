import { useQuery } from "@apollo/client";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import { Alert, AlertTitle, Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetLibraryDocument, GetLibraryQuery, GetLibraryQueryVariables } from "../models/gql";
import { ISong } from "../types";
import './styles.css';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
		a: { [key in Key]: any },
		b: { [key in Key]: any }
	) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof ISong;
	label: string;
	numeric: boolean;
}

const headCells: HeadCell[] = [
	{
		id: "title",
		numeric: false,
		disablePadding: false,
		label: "Title",
	},
	{
		id: "artist",
		numeric: false,
		disablePadding: false,
		label: "Artist",
	},
	{
		id: "album",
		numeric: false,
		disablePadding: false,
		label: "Album",
	},
	{
		id: "duration",
		numeric: true,
		disablePadding: false,
		label: "Duration",
	},
];

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ISong
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		order,
		orderBy,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof ISong) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell
					key="empty-cell"
					padding="normal"
					width={"20px"}
				/>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				My Songs
			</Typography>
		</Toolbar>
	);
};

export default function Library() {

	var rows: ISong[] = [];

	const { loading, error, data } = useQuery<GetLibraryQuery, GetLibraryQueryVariables>(GetLibraryDocument, {
		onCompleted: (data) => {
			console.log(data.getLibrary?.songs.length, "songs retrieved")
		}
	})

	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof ISong>("id");
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	// const [currentSong, setCurrentSong] = React.useState<ISong>()
	const [_, setCurrentSong] = useLocalStorage("currentSong", "");


	if (loading) return (
		<Box justifyContent="center" display="flex">
			<CircularProgress size="8%" />
		</Box >
	);

	if (error) return <Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		{error.message}
	</Alert>

	if (data) {
		rows = data.getLibrary?.songs || []

		const handleRequestSort = (
			event: React.MouseEvent<unknown>,
			property: keyof ISong
		) => {
			const isAsc = orderBy === property && order === "asc";
			setOrder(isAsc ? "desc" : "asc");
			setOrderBy(property);
		};

		const handleChangePage = (event: unknown, newPage: number) => {
			setPage(newPage);
		};

		const handleChangeRowsPerPage = (
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			setRowsPerPage(parseInt(event.target.value, 10));
			setPage(0);
		};

		const handleClickPlay = (
			song: ISong
		) => {
			setCurrentSong(JSON.stringify(song));
		};

		// Avoid a layout jump when reaching the last page with empty rows.
		const emptyRows =
			page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

		return (
			<>
				<Box sx={{ width: "100%" }}>
					<Paper sx={{ width: "100%", mb: 2 }}>
						<EnhancedTableToolbar />
						<TableContainer>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby="tableTitle"
								size="small"
							>
								<EnhancedTableHead
									order={order}
									orderBy={orderBy}
									onRequestSort={handleRequestSort}
									rowCount={rows.length}
								/>
								<TableBody>
									{
										rows.slice().sort(getComparator(order, orderBy))
											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map((row, index) => {
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow
														hover
														role="checkbox"
														tabIndex={-1}
														key={row.id}
													>
														<TableCell
															padding="normal"
															width={"20px"}
														>
															<IconButton onClick={() => {
																handleClickPlay(row)
															}} sx={{ padding: "0" }}>
																<PlayCircleFilledTwoToneIcon />
															</IconButton>
														</TableCell>
														<TableCell
															component="th"
															id={labelId}
															scope="row"
															padding="normal"
														>
															{row.title}
														</TableCell>
														<TableCell width="15%">{row.artist.name}</TableCell>
														<TableCell width="15%">{row.album?.title}</TableCell>
														<TableCell width="5%" align="right">{row.duration}</TableCell>
													</TableRow>
												);
											})
									}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height: 33 * emptyRows,
											}}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[20, 50, 100]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
				</Box>
			</>
		);
	}
	return (<Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		Error in query.
	</Alert>);
}
