import { Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Router from "next/router";
const title = "Página principal";

export default function Home() {
  return (<>
    <Navbar title={title} />
    <Box style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", margin: "15px" }}>
      <Button onClick={() => { Router.push("/oportunidades") }} color="primary" variant="contained" style={{ margin: "5px" }}>Oportunidades</Button>
      <Button onClick={() => { Router.push("/procura") }} color="primary" variant="contained" style={{ margin: "5px" }}>Procura</Button>
      <Button onClick={() => { Router.push("/cotizaciones") }} color="primary" variant="contained" style={{ margin: "5px" }}>Cotizaciones</Button>
    </Box>
  </>
  );
}
