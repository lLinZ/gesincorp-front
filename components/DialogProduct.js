import * as React from "react";
// MUI Components
import { Divider, Grid, IconButton, Typography, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearAllIcon from '@mui/icons-material/ClearAll';
// Formik
import { Formik } from "formik";

// FC
export default function ProductDialog({ openDialog, set, setAlert, setProducts }) {

    // Detalles temporales de la oportunidad (lista de detalles)
    const [detalles, setDetalles] = React.useState([])

    // Contador de detalles
    const [contadorDetalles, setContadorDetalles] = React.useState(1);

    // Funcion para el boton de añadir detalle
    const addDetail = (r, values) => {

        // Campos
        const { descripcionproducto, numerodeparte, preciosugerido } = values;

        // Contador de campos vacíos
        let counter = 0;

        // Mensaje de error
        let errores = "Campos vacíos: ";

        // Si el campo descripcionproducto está vacío
        if (!descripcionproducto) {
            errores += "Descripcion de producto"
            counter++;
        }
        // Si el campo numerodeparte está vacío
        if (!numerodeparte) {
            errores += counter > 0 ? ", numero de parte" : "Numero de parte";
            counter++;
        }
        // Si el campo preciosugerido está vacío
        if (!preciosugerido) {
            errores += counter > 0 ? ", precio sugerido" : "Precio sugerido";
            counter++;
        }
        // Si existen errores
        if (counter > 0) {
            setAlert({
                alert: true,
                title: "Oops!",
                text: errores,
                type: "error"
            })
        } else {
            const newDetails = {
                idproducto: contadorDetalles,
                tipo: 0,
                linea: 0,
                descripcionproducto: values.descripcionproducto,
                numerodeparte: values.numerodeparte,
                preciosugerido: values.preciosugerido,
            }
            setDetalles(prev => [...prev, newDetails]);
            r();
            setContadorDetalles(contadorDetalles + 1)
        }
    }

    // Funcion para cerrar el modal
    const handleClose = () => {
        set(false);
    };

    // Funcion para el boton de limpiar
    const clearAll = () => {
        setDetalles([]);
        setProducts([]);
        setContadorDetalles(1)
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
                    Registrar detalles
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        En este formulario podrás añadir los detalles de la oportunidad, es decir, los productos adicionales.
                    </DialogContentText>
                    <Formik
                        initialValues={{
                            linea: 0,
                            tipo: 0,
                            descripcionproducto: "",
                            numerodeparte: "",
                            preciosugerido: ""
                        }}
                        onSubmit={async (data, { initialValues, resetForm }) => {
                            setProducts(detalles);
                            setAlert({
                                alert: true,
                                title: "¡Perfecto!",
                                text: "Los detalles han sido guardados exitosamente",
                                type: "success"
                            })
                            set(false);
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
                                    justifyContent="center"
                                    gap={1}
                                >
                                    <Grid item xs={12} sm={4} md={3}>
                                        <TextField
                                            id="descripcionproducto"
                                            name="descripcionproducto"
                                            label="Descripcion Producto"
                                            type="text"
                                            variant="standard"
                                            onChange={handleChange}
                                            value={values.descripcionproducto}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <TextField
                                            id="numerodeparte"
                                            name="numerodeparte"
                                            label="Numero de parte"
                                            type="text"
                                            variant="standard"
                                            onChange={handleChange}
                                            value={values.numerodeparte}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <TextField
                                            id="preciosugerido"
                                            name="preciosugerido"
                                            label="Precio sugerido"
                                            type="text"
                                            variant="standard"
                                            onChange={handleChange}
                                            value={values.preciosugerido}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                                        <Button type="button" onClick={() => addDetail(resetForm, values)}>Añadir detalle</Button>
                                    </Grid>
                                </Grid>
                                {detalles && (<Divider textAlign="center">
                                    <Box style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant="body2" style={{ margin: "20px 0" }}>Lista de detalles</Typography>
                                        <IconButton onClick={clearAll}><ClearAllIcon /></IconButton>
                                    </Box>
                                </Divider>
                                )}
                                {detalles && detalles.map((d, i) => (<Typography key={d.idproducto}>- {d.descripcionproducto}</Typography>))}

                                {/* Boton de cerrar modal */}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cerrar</Button>
                                    <Button type="submit">Guardar</Button>
                                </DialogActions>

                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div >
    );
}
