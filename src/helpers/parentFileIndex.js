export const parentFileIndex = (files, fileParentId) => {
    let parentIndex = files.findIndex((file) => file.id == fileParentId);
    return parentIndex;
}