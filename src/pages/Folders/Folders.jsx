import { useSelector } from "react-redux";
import { Folder } from "../../components/Folder";

export const Folders = () => {
  const parentFolder = useSelector((state) => state.fileSystem.parentFolder);
  const folders = useSelector(
    (state) => state.fileSystem.fileSystemItems.root.unidad.folders
  );

  return (
    <>
      <div>Folders</div>
      {folders.length > 0 ? (
        <Folders>
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </Folders>
      ) : (
        <div>No hay carpetas</div>
      )}
      <br />
      <div>Files</div>
      <br />
    </>
  );
};
