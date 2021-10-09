import {ILibraryItem} from "../../../api/src/models/library";
import axios from "axios";

export const loadView = async (viewId: string): Promise<ILibraryItem> => {
    const url = `http://192.168.0.169:9000/api/library/browse?id=${viewId}`;
    const response = await axios.get(url)
    return response.data as ILibraryItem;
}