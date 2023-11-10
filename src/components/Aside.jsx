import Card from 'react-bootstrap/Card';
import { MainNode } from './MainNode';
import { useSelector } from "react-redux";
import { FolderNode } from './FolderNode';

export const Aside = () => {
  const folders = useSelector((state) => state.fileSystem.fileSystemItems.root.unidad.folders);
  
  return (
    <Card style={{ width: "20%", height: '90vh'}}>
      <MainNode />
      {folders.length > 0 && folders.map((folder) => <FolderNode key={folder.id} folder={folder} />)}
    </Card>
  );
};
