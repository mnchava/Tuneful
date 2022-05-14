import { useQuery } from "@apollo/client";
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import LoopIcon from '@mui/icons-material/Loop';
import PauseIcon from '@mui/icons-material/Pause';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Alert, AlertTitle, Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { GetLibraryDocument, GetLibraryQuery, GetLibraryQueryVariables } from "../models/generated";
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

const playerIcons = {
	play: <PlayArrowIcon fontSize="large" />,
	pause: <PauseIcon fontSize="large" />,
	rewind: <FastRewindIcon fontSize="large" />,
	forward: <FastForwardIcon fontSize="large" />,
	previous: <SkipPreviousIcon />,
	next: <SkipNextIcon />,
	loop: <LoopIcon />,
	volume: <VolumeUpIcon />,
	volumeMute: <VolumeMuteIcon />,
};

export default function Library() {

	const theme = useTheme();

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
	const [currentlyPlaying, setCurrentlyPlaying] = React.useState<ISong>()
	const [lastPlayed, setLastPlayed] = React.useState<ISong>()

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

		const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
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
			if (currentlyPlaying === song) {
				setCurrentlyPlaying(undefined);
			} else if (lastPlayed === song) {
				setCurrentlyPlaying(song);
			} else {
				setCurrentlyPlaying(song);
				setLastPlayed(song);
			}
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
												const isPlaying = currentlyPlaying === row;

												return (
													<TableRow
														hover
														onClick={(event) => handleClick(event, row.title)}
														role="checkbox"
														tabIndex={-1}
														key={row.id}
														sx={isPlaying ? { background: theme.palette.primary.dark } : {}}
													>
														<TableCell
															padding="normal"
															width={"20px"}
														>
															<IconButton onClick={() => {
																handleClickPlay(row)
															}} sx={{ padding: "0" }}>
																{isPlaying ?
																	<PauseCircleFilledTwoToneIcon />
																	:
																	<PlayCircleFilledTwoToneIcon />
																}
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
														<TableCell width="15%">{row.artist.map((a) => a.name).join(", ")}</TableCell>
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
				<AudioPlayer
					src={currentlyPlaying ? "http://3.218.67.164:9019/" + currentlyPlaying.audioFile : ""}
					layout="stacked-reverse"
					onPlayError={err => console.log(err)}
					onError={err => console.log(err)}
					autoPlayAfterSrcChange
					showSkipControls
					showJumpControls={false}
					showFilledVolume
					autoPlay
					customIcons={playerIcons}
					customAdditionalControls={[]}
					customControlsSection={
						[
							RHAP_UI.MAIN_CONTROLS,
							RHAP_UI.CURRENT_TIME,
							<div style={{ fontWeight: "800" }}>/</div>,
							RHAP_UI.DURATION,
						]
					}
					customProgressBarSection={
						[
							RHAP_UI.PROGRESS_BAR,
							RHAP_UI.VOLUME,
						]
					}
					customVolumeControls={[]}
					style={{
						width: '340px'
					}}
					onClickNext={e => {
						if (currentlyPlaying) {
							const index = rows.indexOf(currentlyPlaying);
							const next = index < rows.length - 1 ? index + 1 : 0;
							setCurrentlyPlaying(rows[next])
						}
					}}
					onClickPrevious={e => {
						if (currentlyPlaying) {
							const index = rows.indexOf(currentlyPlaying);
							const next = index === 0 ? rows.length - 1 : index - 1;
							setCurrentlyPlaying(rows[next])
						}
					}}
					onEnded={(e) => {
						if (currentlyPlaying) {
							const index = rows.indexOf(currentlyPlaying);
							const next = index < rows.length - 1 ? index + 1 : 0;
							setCurrentlyPlaying(rows[next])
						}
					}}
				/>
			</>
		);
	}
	return (<Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		Error in query.
	</Alert>);
}
