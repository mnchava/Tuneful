import { useMutation, useQuery } from "@apollo/client";
import { Alert, AlertTitle, Avatar, Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AddToLibraryDocument, AddToLibraryMutation, AddToLibraryMutationVariables, GetAlbumsDocument, GetAlbumsQuery, GetAlbumsQueryVariables } from "../models/gql";
import AlbumTwoToneIcon from '@mui/icons-material/AlbumTwoTone';

interface ISong {
	__typename?: "SongType";
	id: string;
	audioFile: string;
	duration?: string | null;
	indexInAlbum: number;
	likes: number;
	price: number;
	title: string;
	album?: { __typename?: "AlbumType"; title: string } | null;
	artist: { __typename?: "ArtistType"; name: string };
}

export default function Store() {

	interface Cart {
		songs: Set<ISong>
	}

	const [cart, setCart] = useState<Cart>({ songs: new Set() })

	const { loading: albumLoading, error: albumError, data: albumData } = useQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument)

	const [addSongs, { loading: addLoading, error: addError, data: addData }] = useMutation<AddToLibraryMutation, AddToLibraryMutationVariables>(AddToLibraryDocument, {
		variables: {
			songIds: [...cart.songs].map((s) => s.id)
		},
		onCompleted: (data) => {
			console.log(`Added ${data.addToLibrary?.added} songs.`);
		}
	})

	async function addAlbum(songs: ISong[]) {
		await setCart({
			songs: new Set([...(cart.songs), ...songs])
		})
		console.log(cart.songs)
		addSongs()
	}

	if (albumLoading) return <Stack direction="row" spacing={3} overflow="auto">
		{[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => {
			return <Box key={`${n}-${i}`}>
				<Skeleton variant="rectangular" animation="wave" width={180} height={180} />
				<Skeleton variant="text" animation="wave" width={160} />
				<Skeleton variant="text" animation="wave" width={80} />
			</ Box>
		})}
	</ Stack>;
	else if (albumError) return <Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		{albumError.message}
	</Alert>
	else if (albumData) return (
		(<Stack direction="row" spacing={3} overflow="auto">
			{albumData.getAlbums?.map((n, i) => {

				return <Box key={`${n}-${i}`} >
					<Avatar variant="square" sx={{ objectFit: "fill", width: "180px", height: "180px", marginBottom: "12px" }}>
						{n?.externalImageUrl ?
							<img src={n.externalImageUrl} alt="Album cover" width="180px" height="180px" />
							:
							<AlbumTwoToneIcon sx={{ fontSize: "80px" }} />
						}
					</Avatar>
					<Typography fontWeight="800">{n?.title}</Typography>
					<Typography sx={{ fontSize: "0.8rem" }}>{n?.artist.name}</Typography>
					<Typography sx={{ fontSize: "0.6rem" }} fontWeight="300">{n?.trackNumber} tracks</Typography>
					<Chip
						onClick={() => addAlbum(n?.songSet)}
						variant="outlined"
						label={`$${n?.price?.toFixed(2)}`}
					/>
				</ Box>
			})}
		</ Stack>)
	);
	else return (<Alert severity="error">
		<AlertTitle>Error</AlertTitle>
		Error in query.
	</Alert>);
}