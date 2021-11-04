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
import { Grid } from "@mui/material";

export default function FormDialog({ openDialog }) {
  const [open, setOpen] = React.useState(openDialog);

  const handleForm = async (e) => {
    e.preventDefault();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // id
  // nombre
  // rif
  // direccionfiscal
  // telefonos
  // email

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
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
            }}
            onSubmit={async (data, { initialValues, resetForm }) => {
              if (respuesta.status === 200) {
                const data = await respuesta.json();
                if (data.exito === "SI") {
                  resetForm(initialValues);
                } else {
                  setAlert();
                }
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
                </Grid>
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
