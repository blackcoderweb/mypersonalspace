export const existingName = (list, name, ext) => {
    if(ext == false){
        return list.find((folder) => folder.name.toLowerCase() === name.toLowerCase())
    }else{
        let fileExt = name.split('.').pop();
        return list.find((file) => file.fileName.toLowerCase() === name.toLowerCase() && fileExt.toLowerCase() === file.fileName.split('.').pop().toLowerCase())}
}