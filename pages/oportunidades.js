import React, { useState } from "react"
import { Button, TextField, Grid, MenuItem, Select, InputLabel, Snackbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"
import { Formik } from "formik"
import Navbar from "../components/Navbar"
import Autocomplete from '@mui/material/Autocomplete';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
/* Titulo que tendra la Navbar */
const title = "Registro de oportunidades";

/* Estilos CSS */
const useStyle = makeStyles(theme => ({
    field: {
        margin: "10px auto",
        width: "100%"
    },
    button: {
        margin: "10px auto",
        width: "100%"
    },
    formContainer: {
        margin: "25px auto", width: "90%"
    }
}))

/* Server */
export const getServerSideProps = async (req, res) => {

    // URL para obtener los clientes
    const urlClientes = `${process.env.BASE_URL}/clientes`;
    // Options de los clientes
    const optionsClientes = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    // URL para obtener los vendedores
    const urlVendedores = `${process.env.BASE_URL}/vendedores`;
    // Options de los vendedores
    const optionsVendedores = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Se solicitan los clientes
    const respuestaClientes = await fetch(urlClientes, optionsClientes);
    const dataClientes = await respuestaClientes.json();

    // Se solicitan los vendedores
    const respuestaVendedores = await fetch(urlVendedores, optionsVendedores);
    const dataVendedores = await respuestaVendedores.json();

    return {
        props: {
            clientes: dataClientes,
            vendedores: dataVendedores
        }
    }
}

/* Functional Component */
const Oportunidades = ({ clientes, vendedores }) => {
    const [alert, setAlert] = useState({
        alert: false,
        title: '',
        text: '',
        type: ''
    })
    const handleClose = () => {
        setAlert({
            alert: false,
            title: '',
            text: '',
            type: ''
        })
    }
    const classes = useStyle();
    return (
        <>
            {/* Barra de navegacion */}
            <Navbar title={title} />

            {/* Grid layout */}
            <Grid container spacing={3} alignItems="center" justifyContent="center">

                {/* Grid Form */}
                <Grid item xs={12} sm={6} md={4} lg={4}>

                    <Box className={classes.formContainer}>
                        <Formik
                            initialValues={{
                                requerimiento: '',
                                comentario: '',
                                idcliente: 0,
                                idvendedor: 0,
                                direccionentrega: '',
                                prioridad_precio: '',
                                prioridad_plazo: '',
                                prioridad_marca: '',
                                prioridad_garantia: '',
                                montolead: '',
                                plazo: '',
                                fechahora: '',
                                fechaestimadacierre: '',
                            }}
                            onSubmit={async (datos, { initialValues, resetForm }) => {

                                console.log('Formulario enviado', { datos });
                                const urlSend = `${window.location.origin}/api/oportunidad/add`;
                                const raw = JSON.stringify({ datos: datos })
                                const optionsSend = {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: raw
                                }
                                const respuesta = await fetch(urlSend, optionsSend);

                                if (respuesta.status === 200) {
                                    const data = await respuesta.json();
                                    console.log(data);
                                    resetForm(initialValues);
                                    setAlert({
                                        alert: true,
                                        title: "Yay!",
                                        text: 'Se ha registrado el usuario exitosamente',
                                        type: "success"
                                    })
                                } else {
                                    setAlert({
                                        alert: true,
                                        title: "Oops...",
                                        text: 'No se ha logrado registrar el usuario',
                                        type: "warning"
                                    })
                                }
                            }}
                        >
                            {({ handleChange, handleSubmit, values, resetForm, initialValues }) => (
                                <form className="formulario" onSubmit={handleSubmit} style={{ display: "flex", flexFlow: "column wrap", padding: "10px" }}>
                                    <Grid container justifyContent="center" alignItems="center" columnSpacing={1}>

                                        {/* Requerimiento */}
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Requerimiento"
                                                name="requerimiento"
                                                id="requerimiento"
                                                placeholder="Escriba el requerimiento..."
                                                value={values.requerimiento}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* comentario */}
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Comentario"
                                                name="comentario"
                                                id="comentario"
                                                placeholder="Escriba el comentario"
                                                multiline
                                                value={values.comentario}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* idcliente */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <InputLabel id="cliente-seleccionado">Cliente</InputLabel>
                                            <Select
                                                labelId="cliente-seleccionado"
                                                name="idcliente"
                                                id="idcliente"
                                                label='Cliente'
                                                value={values.idcliente}
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                            >
                                                <MenuItem value={0} disabled>
                                                    <em>Seleccionar</em>
                                                </MenuItem>
                                                {clientes.map(cl => (<MenuItem key={cl.id} value={cl.id}>{`${cl.nombre} ${cl.rif}`}</MenuItem>))}
                                            </Select>
                                        </Grid>
                                        {/* idvendedor */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <InputLabel id="vendedor-seleccionado">Vendedor</InputLabel>
                                            <Select
                                                labelId="vendedor-seleccionado"
                                                name="idvendedor"
                                                id="idvendedor"
                                                label="Vendedor"
                                                value={values.idvendedor}
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                            >
                                                <MenuItem value={0} disabled>
                                                    <em>Seleccionar</em>
                                                </MenuItem>
                                                {vendedores.map(vendedor => (<MenuItem key={vendedor.id} value={vendedor.id}>{`${vendedor.nombre} ${vendedor.cedula}`}</MenuItem>))}
                                            </Select>
                                        </Grid>
                                        {/* direccionentrega */}
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Direccion de entrega"
                                                name="direccionentrega"
                                                id="direccionentrega"
                                                placeholder="Escriba la direccion"
                                                multiline
                                                value={values.direccionentrega}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* prioridad_precio */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Prioridad precio"
                                                name="prioridad_precio"
                                                id="prioridad_precio"
                                                placeholder="Escriba el precio a priorizar..."
                                                value={values.prioridad_precio}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* prioridad_plazo */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Prioridad plazo"
                                                name="prioridad_plazo"
                                                id="prioridad_plazo"
                                                placeholder="Escriba el plazo a priorizar..."
                                                value={values.prioridad_plazo}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* prioridad_marca */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Marca de prioridad"
                                                name="prioridad_marca"
                                                id="prioridad_marca"
                                                placeholder="Escriba la marca a priorizar..."
                                                value={values.prioridad_marca}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* prioridad_garantia */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Garantía"
                                                name="prioridad_garantia"
                                                id="prioridad_garantia"
                                                placeholder="Escriba la prioridad de garantía..."
                                                value={values.prioridad_garantia}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>

                                        {/* fechahora */}
                                        <Grid item xs={12} >

                                            <TextField
                                                label="Fecha y hora"
                                                InputLabelProps={{ shrink: true }}
                                                name="fechahora"
                                                id="fechahora"
                                                placeholder="Escriba la fecha y hora..."
                                                value={values.fechahora}
                                                type="datetime-local"
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>
                                        {/* fechaestimadacierre */}
                                        <Grid item xs={12} >
                                            <TextField
                                                label="Fecha estimada de cierre"
                                                InputLabelProps={{ shrink: true }}
                                                name="fechaestimadacierre"
                                                id="fechaestimadacierre"
                                                placeholder="Escriba la fecha y hora..."
                                                value={values.fechaestimadacierre}
                                                type="datetime-local"
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>
                                        {/* plazo */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Plazo"
                                                name="plazo"
                                                id="plazo"
                                                placeholder="Escriba el plazo..."
                                                value={values.plazo}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>
                                        {/* montolead */}
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <TextField
                                                label="Monto lead"
                                                name="montolead"
                                                id="montolead"
                                                placeholder="Escriba el monto de negociacion..."
                                                value={values.montolead}
                                                onChange={handleChange}
                                                className={classes.field}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" color="primary" variant="contained" className={classes.button}>Enviar</Button>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Grid>

            </Grid>
            {alert && (
                <Snackbar open={alert.alert} autoHideDuration={3000} onClose={handleClose}>
                    <Alert variant="filled" onClose={handleClose} severity={alert.type}><b>{alert.title}</b> - {alert.text}</Alert>
                </Snackbar>
            )}
        </>
    )
}
/* comentario	
direccionentrega	
prioridad_precio	
prioridad_plazo	
prioridad_marca	
prioridad_garantia	
fechahora	
plazo	
status	
idvendedor	
montolead	
fechaestimadacierre */
export default Oportunidades;
