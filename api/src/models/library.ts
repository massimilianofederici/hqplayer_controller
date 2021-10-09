export interface ILibraryItem {
    Key: string;
}

export interface ILibraryFolder extends ILibraryItem {
    Name: string;
    imageUrl?: string;
    folders: ILibraryFolder[]
}

export interface ILibraryAlbum extends ILibraryItem {
    Album: string;
    Artist: string;
    Composer: string;
    "Date"?: string;
    Genre?: string;
    Recording?: string;
    Score?: string;
    path: string;
    tracks: ILibraryFile[];
    imageUrl?: string;
}

export interface ILibraryFile extends ILibraryItem {
    Name: string;
    Artist: string;
    Album: string;
    Composer: string;
    Duration: number;
    Filename: string;
    Genre: string;
    Recording?: string;
    Score?: string;
    "Track #": number;
    "Date"?: string;

}
