import { routes } from "../../../routes";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const displayBlock = useMediaQuery('(min-width:600');
  return (
    <Box width={240} height={"100%"}>
      <div className="flex justify-end pr-3 py-4">
        <IconButton>
          <ArrowBackIosTwoToneIcon sx={{fontSize: "16px"}}/>
        </IconButton>
      </div>
      <Divider />
      <Stack sx={{
        py: 1
      }}>
        <LinkItem
          icon={<MenuBookIcon />}
          title={"교과과목"}
          href={routes.adminSubject.namespace + routes.adminSubject.path}
        />
      </Stack>
    </Box>
  );
}

interface LinkItemProps {
  icon?: React.ReactNode;
  title?: string;
  href: string;
}

const LinkItem: React.FC<LinkItemProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Button sx={{
        width: "100%",
        py: 2
      }}
      onClick={() => navigate(props.href)}
    >
      <Grid container direction={"row"}>
        <Grid item xs={2} sx={{color: "GrayText"}}>
          {props.icon}
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography sx={{
            textAlign: "left",
            color: "MenuText"
          }}>{props.title}</Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

const AdminBaseContainer = ({
  children
}: {children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <SideNavBar/>
      <Divider orientation={"vertical"} />
      {children}
    </div>
  );
}

export default AdminBaseContainer;
