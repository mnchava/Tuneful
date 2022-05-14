import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type AlbumType = {
  __typename?: "AlbumType";
  albumDuration?: Maybe<Scalars["String"]>;
  artist?: Maybe<ArtistType>;
  externalImageUrl?: Maybe<Scalars["String"]>;
  genre: Array<GenreType>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  likes: Scalars["Int"];
  price?: Maybe<Scalars["Float"]>;
  /** YYYY-MM-DD */
  releaseDate: Scalars["Date"];
  songSet: Array<SongType>;
  title: Scalars["String"];
  trackNumber?: Maybe<Scalars["Int"]>;
};

/** An enumeration. */
export enum ArtistCountry {
  /** Andorra */
  Ad = "AD",
  /** United Arab Emirates */
  Ae = "AE",
  /** Afghanistan */
  Af = "AF",
  /** Antigua and Barbuda */
  Ag = "AG",
  /** Anguilla */
  Ai = "AI",
  /** Albania */
  Al = "AL",
  /** Armenia */
  Am = "AM",
  /** Angola */
  Ao = "AO",
  /** Antarctica */
  Aq = "AQ",
  /** Argentina */
  Ar = "AR",
  /** American Samoa */
  As = "AS",
  /** Austria */
  At = "AT",
  /** Australia */
  Au = "AU",
  /** Aruba */
  Aw = "AW",
  /** Åland Islands */
  Ax = "AX",
  /** Azerbaijan */
  Az = "AZ",
  /** Bosnia and Herzegovina */
  Ba = "BA",
  /** Barbados */
  Bb = "BB",
  /** Bangladesh */
  Bd = "BD",
  /** Belgium */
  Be = "BE",
  /** Burkina Faso */
  Bf = "BF",
  /** Bulgaria */
  Bg = "BG",
  /** Bahrain */
  Bh = "BH",
  /** Burundi */
  Bi = "BI",
  /** Benin */
  Bj = "BJ",
  /** Saint Barthélemy */
  Bl = "BL",
  /** Bermuda */
  Bm = "BM",
  /** Brunei */
  Bn = "BN",
  /** Bolivia */
  Bo = "BO",
  /** Bonaire, Sint Eustatius and Saba */
  Bq = "BQ",
  /** Brazil */
  Br = "BR",
  /** Bahamas */
  Bs = "BS",
  /** Bhutan */
  Bt = "BT",
  /** Bouvet Island */
  Bv = "BV",
  /** Botswana */
  Bw = "BW",
  /** Belarus */
  By = "BY",
  /** Belize */
  Bz = "BZ",
  /** Canada */
  Ca = "CA",
  /** Cocos (Keeling) Islands */
  Cc = "CC",
  /** Congo (the Democratic Republic of the) */
  Cd = "CD",
  /** Central African Republic */
  Cf = "CF",
  /** Congo */
  Cg = "CG",
  /** Switzerland */
  Ch = "CH",
  /** Côte d'Ivoire */
  Ci = "CI",
  /** Cook Islands */
  Ck = "CK",
  /** Chile */
  Cl = "CL",
  /** Cameroon */
  Cm = "CM",
  /** China */
  Cn = "CN",
  /** Colombia */
  Co = "CO",
  /** Costa Rica */
  Cr = "CR",
  /** Cuba */
  Cu = "CU",
  /** Cabo Verde */
  Cv = "CV",
  /** Curaçao */
  Cw = "CW",
  /** Christmas Island */
  Cx = "CX",
  /** Cyprus */
  Cy = "CY",
  /** Czechia */
  Cz = "CZ",
  /** Germany */
  De = "DE",
  /** Djibouti */
  Dj = "DJ",
  /** Denmark */
  Dk = "DK",
  /** Dominica */
  Dm = "DM",
  /** Dominican Republic */
  Do = "DO",
  /** Algeria */
  Dz = "DZ",
  /** Ecuador */
  Ec = "EC",
  /** Estonia */
  Ee = "EE",
  /** Egypt */
  Eg = "EG",
  /** Western Sahara */
  Eh = "EH",
  /** Eritrea */
  Er = "ER",
  /** Spain */
  Es = "ES",
  /** Ethiopia */
  Et = "ET",
  /** Finland */
  Fi = "FI",
  /** Fiji */
  Fj = "FJ",
  /** Falkland Islands (Malvinas) */
  Fk = "FK",
  /** Micronesia (Federated States of) */
  Fm = "FM",
  /** Faroe Islands */
  Fo = "FO",
  /** France */
  Fr = "FR",
  /** Gabon */
  Ga = "GA",
  /** United Kingdom */
  Gb = "GB",
  /** Grenada */
  Gd = "GD",
  /** Georgia */
  Ge = "GE",
  /** French Guiana */
  Gf = "GF",
  /** Guernsey */
  Gg = "GG",
  /** Ghana */
  Gh = "GH",
  /** Gibraltar */
  Gi = "GI",
  /** Greenland */
  Gl = "GL",
  /** Gambia */
  Gm = "GM",
  /** Guinea */
  Gn = "GN",
  /** Guadeloupe */
  Gp = "GP",
  /** Equatorial Guinea */
  Gq = "GQ",
  /** Greece */
  Gr = "GR",
  /** South Georgia and the South Sandwich Islands */
  Gs = "GS",
  /** Guatemala */
  Gt = "GT",
  /** Guam */
  Gu = "GU",
  /** Guinea-Bissau */
  Gw = "GW",
  /** Guyana */
  Gy = "GY",
  /** Hong Kong */
  Hk = "HK",
  /** Heard Island and McDonald Islands */
  Hm = "HM",
  /** Honduras */
  Hn = "HN",
  /** Croatia */
  Hr = "HR",
  /** Haiti */
  Ht = "HT",
  /** Hungary */
  Hu = "HU",
  /** Indonesia */
  Id = "ID",
  /** Ireland */
  Ie = "IE",
  /** Israel */
  Il = "IL",
  /** Isle of Man */
  Im = "IM",
  /** India */
  In = "IN",
  /** British Indian Ocean Territory */
  Io = "IO",
  /** Iraq */
  Iq = "IQ",
  /** Iran */
  Ir = "IR",
  /** Iceland */
  Is = "IS",
  /** Italy */
  It = "IT",
  /** Jersey */
  Je = "JE",
  /** Jamaica */
  Jm = "JM",
  /** Jordan */
  Jo = "JO",
  /** Japan */
  Jp = "JP",
  /** Kenya */
  Ke = "KE",
  /** Kyrgyzstan */
  Kg = "KG",
  /** Cambodia */
  Kh = "KH",
  /** Kiribati */
  Ki = "KI",
  /** Comoros */
  Km = "KM",
  /** Saint Kitts and Nevis */
  Kn = "KN",
  /** North Korea */
  Kp = "KP",
  /** South Korea */
  Kr = "KR",
  /** Kuwait */
  Kw = "KW",
  /** Cayman Islands */
  Ky = "KY",
  /** Kazakhstan */
  Kz = "KZ",
  /** Laos */
  La = "LA",
  /** Lebanon */
  Lb = "LB",
  /** Saint Lucia */
  Lc = "LC",
  /** Liechtenstein */
  Li = "LI",
  /** Sri Lanka */
  Lk = "LK",
  /** Liberia */
  Lr = "LR",
  /** Lesotho */
  Ls = "LS",
  /** Lithuania */
  Lt = "LT",
  /** Luxembourg */
  Lu = "LU",
  /** Latvia */
  Lv = "LV",
  /** Libya */
  Ly = "LY",
  /** Morocco */
  Ma = "MA",
  /** Monaco */
  Mc = "MC",
  /** Moldova */
  Md = "MD",
  /** Montenegro */
  Me = "ME",
  /** Saint Martin (French part) */
  Mf = "MF",
  /** Madagascar */
  Mg = "MG",
  /** Marshall Islands */
  Mh = "MH",
  /** North Macedonia */
  Mk = "MK",
  /** Mali */
  Ml = "ML",
  /** Myanmar */
  Mm = "MM",
  /** Mongolia */
  Mn = "MN",
  /** Macao */
  Mo = "MO",
  /** Northern Mariana Islands */
  Mp = "MP",
  /** Martinique */
  Mq = "MQ",
  /** Mauritania */
  Mr = "MR",
  /** Montserrat */
  Ms = "MS",
  /** Malta */
  Mt = "MT",
  /** Mauritius */
  Mu = "MU",
  /** Maldives */
  Mv = "MV",
  /** Malawi */
  Mw = "MW",
  /** Mexico */
  Mx = "MX",
  /** Malaysia */
  My = "MY",
  /** Mozambique */
  Mz = "MZ",
  /** Namibia */
  Na = "NA",
  /** New Caledonia */
  Nc = "NC",
  /** Niger */
  Ne = "NE",
  /** Norfolk Island */
  Nf = "NF",
  /** Nigeria */
  Ng = "NG",
  /** Nicaragua */
  Ni = "NI",
  /** Netherlands */
  Nl = "NL",
  /** Norway */
  No = "NO",
  /** Nepal */
  Np = "NP",
  /** Nauru */
  Nr = "NR",
  /** Niue */
  Nu = "NU",
  /** New Zealand */
  Nz = "NZ",
  /** Oman */
  Om = "OM",
  /** Panama */
  Pa = "PA",
  /** Peru */
  Pe = "PE",
  /** French Polynesia */
  Pf = "PF",
  /** Papua New Guinea */
  Pg = "PG",
  /** Philippines */
  Ph = "PH",
  /** Pakistan */
  Pk = "PK",
  /** Poland */
  Pl = "PL",
  /** Saint Pierre and Miquelon */
  Pm = "PM",
  /** Pitcairn */
  Pn = "PN",
  /** Puerto Rico */
  Pr = "PR",
  /** Palestine, State of */
  Ps = "PS",
  /** Portugal */
  Pt = "PT",
  /** Palau */
  Pw = "PW",
  /** Paraguay */
  Py = "PY",
  /** Qatar */
  Qa = "QA",
  /** Réunion */
  Re = "RE",
  /** Romania */
  Ro = "RO",
  /** Serbia */
  Rs = "RS",
  /** Russia */
  Ru = "RU",
  /** Rwanda */
  Rw = "RW",
  /** Saudi Arabia */
  Sa = "SA",
  /** Solomon Islands */
  Sb = "SB",
  /** Seychelles */
  Sc = "SC",
  /** Sudan */
  Sd = "SD",
  /** Sweden */
  Se = "SE",
  /** Singapore */
  Sg = "SG",
  /** Saint Helena, Ascension and Tristan da Cunha */
  Sh = "SH",
  /** Slovenia */
  Si = "SI",
  /** Svalbard and Jan Mayen */
  Sj = "SJ",
  /** Slovakia */
  Sk = "SK",
  /** Sierra Leone */
  Sl = "SL",
  /** San Marino */
  Sm = "SM",
  /** Senegal */
  Sn = "SN",
  /** Somalia */
  So = "SO",
  /** Suriname */
  Sr = "SR",
  /** South Sudan */
  Ss = "SS",
  /** Sao Tome and Principe */
  St = "ST",
  /** El Salvador */
  Sv = "SV",
  /** Sint Maarten (Dutch part) */
  Sx = "SX",
  /** Syria */
  Sy = "SY",
  /** Eswatini */
  Sz = "SZ",
  /** Turks and Caicos Islands */
  Tc = "TC",
  /** Chad */
  Td = "TD",
  /** French Southern Territories */
  Tf = "TF",
  /** Togo */
  Tg = "TG",
  /** Thailand */
  Th = "TH",
  /** Tajikistan */
  Tj = "TJ",
  /** Tokelau */
  Tk = "TK",
  /** Timor-Leste */
  Tl = "TL",
  /** Turkmenistan */
  Tm = "TM",
  /** Tunisia */
  Tn = "TN",
  /** Tonga */
  To = "TO",
  /** Turkey */
  Tr = "TR",
  /** Trinidad and Tobago */
  Tt = "TT",
  /** Tuvalu */
  Tv = "TV",
  /** Taiwan */
  Tw = "TW",
  /** Tanzania */
  Tz = "TZ",
  /** Ukraine */
  Ua = "UA",
  /** Uganda */
  Ug = "UG",
  /** United States Minor Outlying Islands */
  Um = "UM",
  /** United States of America */
  Us = "US",
  /** Uruguay */
  Uy = "UY",
  /** Uzbekistan */
  Uz = "UZ",
  /** Holy See */
  Va = "VA",
  /** Saint Vincent and the Grenadines */
  Vc = "VC",
  /** Venezuela */
  Ve = "VE",
  /** Virgin Islands (British) */
  Vg = "VG",
  /** Virgin Islands (U.S.) */
  Vi = "VI",
  /** Vietnam */
  Vn = "VN",
  /** Vanuatu */
  Vu = "VU",
  /** Wallis and Futuna */
  Wf = "WF",
  /** Samoa */
  Ws = "WS",
  /** Yemen */
  Ye = "YE",
  /** Mayotte */
  Yt = "YT",
  /** South Africa */
  Za = "ZA",
  /** Zambia */
  Zm = "ZM",
  /** Zimbabwe */
  Zw = "ZW",
}

export type ArtistType = {
  __typename?: "ArtistType";
  albumSet: Array<AlbumType>;
  country: ArtistCountry;
  externalImageUrl?: Maybe<Scalars["String"]>;
  followers: Scalars["Int"];
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  songSet: Array<SongType>;
};

export type DeleteJsonWebTokenCookie = {
  __typename?: "DeleteJSONWebTokenCookie";
  deleted: Scalars["Boolean"];
};

export type GenreType = {
  __typename?: "GenreType";
  albumSet: Array<AlbumType>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type LibraryMutation = {
  __typename?: "LibraryMutation";
  added?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addToLibrary?: Maybe<LibraryMutation>;
  createUser?: Maybe<UserType>;
  deleteTokenCookie?: Maybe<DeleteJsonWebTokenCookie>;
  refreshToken?: Maybe<Refresh>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateUser?: Maybe<UserMutation>;
  verifyToken?: Maybe<Verify>;
};

export type MutationAddToLibraryArgs = {
  libId: Scalars["ID"];
  songIds: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationCreateUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  email: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  username: Scalars["String"];
};

export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

export type OrderItemType = {
  __typename?: "OrderItemType";
  id: Scalars["ID"];
  item: SongType;
};

/** An enumeration. */
export enum OrderStatus {
  /** cancelled */
  Cancelled = "CANCELLED",
  /** completed */
  Completed = "COMPLETED",
  /** new */
  New = "NEW",
  /** processing */
  Processing = "PROCESSING",
}

export type OrderType = {
  __typename?: "OrderType";
  created: Scalars["DateTime"];
  deliveryAddress: Scalars["String"];
  id: Scalars["ID"];
  items: Array<OrderItemType>;
  ordered?: Maybe<Scalars["DateTime"]>;
  status: OrderStatus;
};

export type PlaylistType = {
  __typename?: "PlaylistType";
  encodedImage: Scalars["String"];
  followers: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  public: Scalars["Boolean"];
  songs: Array<SongType>;
};

export type Query = {
  __typename?: "Query";
  getAlbums?: Maybe<Array<AlbumType>>;
  getArtists?: Maybe<Array<ArtistType>>;
  getLibrary?: Maybe<UserLibraryType>;
  getPlaylists?: Maybe<Array<PlaylistType>>;
  getSongs?: Maybe<Array<SongType>>;
  getUser?: Maybe<UserType>;
  orders?: Maybe<Array<Maybe<OrderType>>>;
  viewer?: Maybe<UserType>;
};

export type QueryGetUserArgs = {
  username: Scalars["String"];
};

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

export type SongType = {
  __typename?: "SongType";
  album?: Maybe<AlbumType>;
  artist: Array<ArtistType>;
  /** Allowed type - .mp3 */
  audioFile: Scalars["String"];
  duration?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  indexInAlbum: Scalars["Int"];
  likes: Scalars["Int"];
  price: Scalars["Float"];
  title: Scalars["String"];
};

export type UserLibraryType = {
  __typename?: "UserLibraryType";
  id: Scalars["ID"];
  songs: Array<SongType>;
  user?: Maybe<UserType>;
};

export type UserMutation = {
  __typename?: "UserMutation";
  User?: Maybe<UserType>;
};

export type UserType = {
  __typename?: "UserType";
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  isActive: Scalars["Boolean"];
  isStaff: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  orders: Array<OrderType>;
  playlistSet: Array<PlaylistType>;
  userlibrary?: Maybe<UserLibraryType>;
  username: Scalars["String"];
};

export type Verify = {
  __typename?: "Verify";
  payload: Scalars["GenericScalar"];
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  tokenAuth?: {
    __typename?: "ObtainJSONWebToken";
    payload: any;
    token: string;
  } | null;
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "UserType";
    username: string;
    email: string;
  } | null;
};

export type UserInfoQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type UserInfoQuery = {
  __typename?: "Query";
  getUser?: {
    __typename?: "UserType";
    id: string;
    isSuperuser: boolean;
    username: string;
    email: string;
    isStaff: boolean;
    dateJoined: any;
    image: string;
    playlistSet: Array<{
      __typename?: "PlaylistType";
      id: string;
      name: string;
      public: boolean;
    }>;
  } | null;
};

export type GetLibraryQueryVariables = Exact<{ [key: string]: never }>;

export type GetLibraryQuery = {
  __typename?: "Query";
  getLibrary?: {
    __typename?: "UserLibraryType";
    id: string;
    songs: Array<{
      __typename?: "SongType";
      id: string;
      audioFile: string;
      duration: string;
      indexInAlbum: number;
      likes: number;
      price: number;
      title: string;
      album: {
        __typename?: "AlbumType";
        id: string;
        title: string;
        image?: string | null;
        externalImageUrl?: string | null;
        releaseDate: any;
        likes: number;
        albumDuration: string;
        price: number;
        trackNumber: number;
      };
      artist: {
        id: string;
        name: string;
        country: string;
        followers: number;
        externalImageUrl: string;
        image: string;
      }[];
    }>;
  } | null;
};

export type GetSongsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSongsQuery = {
  __typename?: "Query";
  getSongs?: Array<{
    __typename?: "SongType";
    id: string;
    audioFile: string;
    duration?: string | null;
    indexInAlbum: number;
    likes: number;
    price: number;
    title: string;
    album?: {
      __typename?: "AlbumType";
      id: string;
      title: string;
      image?: string | null;
      externalImageUrl?: string | null;
      releaseDate: any;
      likes: number;
      albumDuration?: string | null;
      price?: number | null;
      trackNumber?: number | null;
    } | null;
    artist: Array<{ __typename?: "ArtistType"; name: string }>;
  }> | null;
};

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAlbumsQuery = {
  __typename?: "Query";
  getAlbums?: Array<{
    __typename?: "AlbumType";
    id: string;
    title: string;
    image?: string | null;
    externalImageUrl?: string | null;
    releaseDate: any;
    likes: number;
    price?: number | null;
    albumDuration?: string | null;
    trackNumber?: number | null;
    artist?: { __typename?: "ArtistType"; name: string } | null;
    genre: Array<{ __typename?: "GenreType"; name: string }>;
    songSet: Array<{
      __typename?: "SongType";
      id: string;
      audioFile: string;
      duration?: string | null;
      indexInAlbum: number;
      likes: number;
      price: number;
      title: string;
      album?: {
        __typename?: "AlbumType";
        id: string;
        title: string;
        image?: string | null;
        externalImageUrl?: string | null;
        releaseDate: any;
        likes: number;
        albumDuration?: string | null;
        price?: number | null;
        trackNumber?: number | null;
      } | null;
      artist: Array<{ __typename?: "ArtistType"; name: string }>;
    }>;
  }> | null;
};

export type AddToLibraryMutationVariables = Exact<{
  libId: Scalars["ID"];
  songIds: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type AddToLibraryMutation = {
  __typename?: "Mutation";
  addToLibrary?: {
    __typename?: "LibraryMutation";
    added?: number | null;
  } | null;
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tokenAuth" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "payload" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "isSuperuser" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "isStaff" } },
                { kind: "Field", name: { kind: "Name", value: "dateJoined" } },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "playlistSet" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "public" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const GetLibraryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetLibrary" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getLibrary" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "songs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "album" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "image" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "externalImageUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "releaseDate" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "likes" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "albumDuration" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "price" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "trackNumber" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "artist" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "audioFile" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "duration" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "indexInAlbum" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "likes" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLibraryQuery, GetLibraryQueryVariables>;
export const GetSongsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSongs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getSongs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "album" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "image" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "externalImageUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "releaseDate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "likes" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "albumDuration" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "trackNumber" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artist" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "audioFile" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "indexInAlbum" },
                },
                { kind: "Field", name: { kind: "Name", value: "likes" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSongsQuery, GetSongsQueryVariables>;
export const GetAlbumsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAlbums" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAlbums" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artist" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalImageUrl" },
                },
                { kind: "Field", name: { kind: "Name", value: "releaseDate" } },
                { kind: "Field", name: { kind: "Name", value: "likes" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "genre" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "songSet" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "album" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "image" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "externalImageUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "releaseDate" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "likes" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "albumDuration" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "price" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "trackNumber" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "artist" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "audioFile" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "duration" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "indexInAlbum" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "likes" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "albumDuration" },
                },
                { kind: "Field", name: { kind: "Name", value: "trackNumber" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAlbumsQuery, GetAlbumsQueryVariables>;
export const AddToLibraryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddToLibrary" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "libId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "songIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addToLibrary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "libId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "libId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "songIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "songIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "added" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddToLibraryMutation,
  AddToLibraryMutationVariables
>;
