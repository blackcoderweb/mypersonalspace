import { JSONPath } from "jsonpath-plus";


export const getFullPath = (selectedFolder, auth, mainUnit) => {

    if(selectedFolder === auth){
        return mainUnit.folder.fullPath;
    }else{
        const result = JSONPath({
            path: `$..children[?(@.id=='${selectedFolder}')]`,
            json: mainUnit,
          });
        return result[0].fullPath;
    }
}