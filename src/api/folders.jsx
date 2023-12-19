import { get, post } from ".";
import * as url from './url'

const getFolders = () => get(url.GET_FOLDERS);
const create = (data, headers) => post(url.CREATE_FOLDER, data, headers);

export {
    getFolders,
    create
}