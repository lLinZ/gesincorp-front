import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik } from "formik";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function FormDialog({ openDialog, set, setAlert }) {
  const [direccionesAdicionales, setDireccionesAdicionales] = React.useState([])
  const [direcciones, setDirecciones] = React.useState('')
  const handleForm = async (e) => {
    e.preventDefault();
  };
  const handleChangeDireccion = (e) => {
    setDirecciones(e.target.value)
  }
  const handleClose = () => {
    set(false);
  };
  const handleDireccion = () => {
    setDireccionesAdicionales((prev) => [...prev, direcciones])
    setDirecciones('')
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCircleOutlineIcon />
          Registrar cliente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            En este formulario podrás registrar un cliente, adicionalmente de la
            direccion o direcciones del mismo.
          </DialogContentText>
          <Formik
            initialValues={{
              nombre: "",
              rif: "",
              direccionfiscal: "",
              telefonos: "",
              email: "",
              direcciones: ""
            }}
            onSubmit={async (data, { initialValues, resetForm }) => {
              const url = `${window.location.origin}/api/clientes/add`
              const raw = JSON.stringify({
                datos: {
                  nombre: data.nombre,
                  rif: data.rif,
                  direccionfiscal: data.direccionfiscal,
                  telefonos: data.telefonos,
                  email: data.email,
                  direcciones: direccionesAdicionales
                }
              })
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: raw
              }
              try {
                const respuesta = await fetch(url, options);
                if (respuesta.status === 200) {
                  const data = await respuesta.json();
                  if (data.exito === "SI") {
                    resetForm(initialValues);
                  } else {
                    setDireccionesAdicionales([])
                    setAlert({
                      alert: true,
                      title: "Oops...",
                      text: data.mensaje,
                      type: "warning",
                    });
                  }
                }
              } catch (err) {
                setAlert({
                  alert: true,
                  title: "Oops...",
                  text: "Ocurrio un error al enviar los datos",
                  type: "warning",
                });
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              resetForm,
              initialValues,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={1}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="nombre"
                      name="nombre"
                      label="Nombre"
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                      value={values.nombre}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="rif"
                      name="rif"
                      label="RIF"
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                      value={values.rif}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="direccionfiscal"
                      name="direccionfiscal"
                      label="Direccion fiscal"
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                      value={values.direccionfiscal}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="telefonos"
                      name="telefonos"
                      label="Telefonos"
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                      value={values.telefonos}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="text"
                      variant="standard"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center" }}>
                      <TextField
                        id="direcciones"
                        name="direcciones"
                        label="Direccion adicional"
                        type="text"
                        variant="standard"
                        onChange={handleChangeDireccion}
                        value={direcciones}
                      />
                      <IconButton onClick={handleDireccion}><AddCircleOutlineIcon /></IconButton>
                    </Box>
                  </Grid>
                </Grid>
                {direccionesAdicionales && (<Divider textAlign="center">
                  <Typography variant="body2" style={{ margin: "20px 0" }}>Lista de direcciones adicionales</Typography>
                </Divider>
                )}
                {direccionesAdicionales && direccionesAdicionales.map(d => (<Typography>- {d}</Typography>))}
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit">Registrar cliente</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
