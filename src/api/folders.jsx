import { get, post } from ".";
import * as url from './url'

const getFolders = () => get(url.GET_FOLDERS);
const createFolder = (data, headers) => post(url.CREATE_FOLDER, data, headers);

export {
    getFolders,
    createFolder
}