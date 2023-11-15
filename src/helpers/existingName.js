export const existingName = (foldersList, folderName) => {
    let alreadyExists = foldersList.find((folder) => folder.name.toLowerCase() === folderName.toLowerCase())
    if(alreadyExists){
        return true
    }else{
        return false
    }
}