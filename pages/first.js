import { Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Formik } from "formik"
import Navbar from "../components/Navbar"

const first = () => {
    return (
        <>
            <Navbar title="Primera vista" />
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>

                    <Box style={{ margin: "25px auto", width: "90%" }}>
                        <Formik
                            initialValues={{
                                campo1: '',
                                campo2: ''
                            }}
                            onSubmit={() => {
                                console.log('Formulario enviado')
                            }}
                        >
                            {({ handleChange, handleSubmit, values }) => (
                                <form className="formulario" onSubmit={handleSubmit} style={{ display: "flex", flexFlow: "column wrap", padding: "10px" }}>
                                    <TextField
                                        label="Primer campo"
                                        name="campo1"
                                        id="campo1"
                                        placeholder="Escriba el campo1"
                                        value={values.campo1}
                                        onChange={handleChange}
                                        style={{ margin: "5px" }}
                                    />
                                    <TextField
                                        label="Segundo campo"
                                        name="campo2"
                                        id="campo2"
                                        placeholder="Escriba el campo2"
                                        value={values.campo2}
                                        onChange={handleChange}
                                        style={{ margin: "5px" }}
                                    />
                                    <Button type="submit" color="primary" variant="contained">Enviar</Button>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Grid>

            </Grid>

        </>
    )
}

export default first
