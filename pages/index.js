import { Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Router from "next/router";
const title = "Página principal";

export default function Home() {
  return (<>
    <Navbar title={title} />
    <Box style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", margin: "15px" }}>
      <Button onClick={() => { Router.push("/first") }} color="primary" variant="contained" style={{ margin: "5px" }}>Vista 1</Button>
      <Button onClick={() => { Router.push("/second") }} color="primary" variant="contained" style={{ margin: "5px" }}>Vista 2</Button>
      <Button onClick={() => { Router.push("/third") }} color="primary" variant="contained" style={{ margin: "5px" }}>Vista 3</Button>
    </Box>
  </>
  );
}
