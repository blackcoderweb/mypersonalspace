import { get, postFile } from ".";
import * as url from './url'

const getFiles = () => get(url.GET_FILES)
const getFilesByFolder = (folderId) => get(url.GET_FILES_BY_FOLDER + folderId)
const uploadFile = (folderId, folderPath, formData) => 
postFile(`${url.UPLOAD_FILE}/${folderId}?folderPath=${folderPath}`, formData) 
export {
    getFiles,
    getFilesByFolder,
    uploadFile
}