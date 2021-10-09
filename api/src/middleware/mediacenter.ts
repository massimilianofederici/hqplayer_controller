import axios from "axios";
import * as xml_js from "xml-js";
import {ILibraryAlbum, ILibraryFile, ILibraryFolder, ILibraryItem} from "../models/library";

export const browse = async (parentId: string): Promise<ILibraryItem> => {
    const mediaCenterUrl = process.env.MEDIACENTER_API_URL;
    const response = await axios.get(`${mediaCenterUrl}/Browse/Children?Version=2&ID=${parentId}`);
    const xml: string = response.data;
    const document = xml_js.xml2js(xml);
    const elements: any[] = document.elements[0].elements;
    if (elements) {
        return folder(parentId, elements);
    }
    return album(parentId);
};

const album = async (parentId: string): Promise<ILibraryAlbum> => {
    const files: ILibraryFile[] = await getFiles(parentId);
    const firstFile = files[0];
    return {
        ...firstFile,
        Key: parentId,
        imageUrl: imageUrl(parentId),
        tracks: files,
        path: firstFile.Filename.substr(0, files[0].Filename.lastIndexOf("/"))
    };
};

const folder = (id: string, xmlElements: any[]): ILibraryFolder => {
    const folders: ILibraryFolder[] = xmlElements.map((e) => {
        const Key = e.elements[0].text;
        const Name = e.attributes.Name;
        return {
            Key,
            Name,
            imageUrl: imageUrl(Key)
        } as ILibraryFolder;
    });
    return {
        Key: id,
        folders,
        Name: ""
    };
}

const getFiles = async (parentId: string): Promise<ILibraryFile[]> => {
    const mediaCenterUrl = process.env.MEDIACENTER_API_URL;
    const response = await axios.get(`${mediaCenterUrl}/Browse/Files?Version=2&ID=${parentId}&Action=JSON`);
    const files: any[] = response.data;
    return files.map((file) => {
        return {
            ...file,
            Date: file["Date (readable)"],
            Recording: file["Original Album"],
            parentId
        } as ILibraryFile;
    });
};

const imageUrl = (Key: string): string => {
    return `${process.env.MEDIACENTER_API_URL}/Browse/Image?ID=${Key}&UseStackedImages=0&Square=1`
}
