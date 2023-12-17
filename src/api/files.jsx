import { get } from ".";
import * as url from './url'

const getFiles = () => get(url.GET_FILES)
const getFilesByFolder = (folderId) => get(url.GET_FILES_BY_FOLDER + folderId)

export {
    getFiles,
    getFilesByFolder
}