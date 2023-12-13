import { get } from ".";
import * as url from './url'

const getFolders = () => get(url.GET_FOLDERS)

export {
    getFolders
}