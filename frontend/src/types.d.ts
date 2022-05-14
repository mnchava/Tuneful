import { UserType } from "./models/generated";

interface IUser {
  dateJoined: string;
  email: string;
  id: string;
  image: string;
  isStaff: boolean;
  isSuperuser: boolean;
  lastLogin?: string;
  playlistSet: Array<PlaylistType>;
  userlibrary?: Maybe<UserLibraryType>;
  username: string;
}

interface ISong {
  id: string;
  audioFile: string;
  duration: string;
  indexInAlbum: number;
  likes: number;
  price: number;
  title: string;
  album: IAlbum;
  artist: IArtist[];
}

interface IArtist {
  id: string;
  name: string;
  country: string;
  followers: number;
  externalImageUrl: string;
  image: string;
}

interface IAlbum {
  id: string;
  title: string;
  image?: string | null;
  externalImageUrl?: string | null;
  releaseDate: string;
  likes: number;
  albumDuration: string;
  price: number;
  trackNumber: number;
}
