import { get } from ".";
import * as url from './url'

const getFiles = () => get(url.GET_FILES)

export {
    getFiles
}