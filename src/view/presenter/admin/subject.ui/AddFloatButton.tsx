import { useContext } from "react";

import { ModalContext } from "./ModalContext";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const AddFloatButton: React.FC = () => {
  const {setModalState} = useContext(ModalContext);
  return (
    <Tooltip title="교과추가" placement="top" sx={{position: 'absolute', bottom: 32, right: 48}}>
      <SpeedDial
        ariaLabel="교과추가"
        icon={<SpeedDialIcon openIcon={<EditIcon/>} />}
        onClick={() => setModalState("CREATE")}
      />
    </Tooltip>
  );
}

export default AddFloatButton;
