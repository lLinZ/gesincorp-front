import { useState } from "react"
import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Formik } from "formik"
import Navbar from "../components/Navbar"
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const second = () => {
    const [lista, setLista] = useState('')
    const [fields, setFields] = useState({
        campo1: '',
        campo2: '',
        campo3: '',
        campo4: '',
        campo5: '',
    })
    const handleChange = (campo) => {
        setFields({
            ...fields,
            [campo.target.name]: campo.target.value
        })
    }
    const handleAdd = () => {
        let errores = [];
        if (!fields.campo1) {
            errores.push("campo1 vacio");
        }
        if (!fields.campo2) {
            errores.push("campo2 vacio");
        }
        if (!fields.campo3) {
            errores.push("campo3 vacio");
        }
        if (!fields.campo4) {
            errores.push("campo4 vacio");
        }
        if (!fields.campo5) {
            errores.push("campo5 vacio");
        }
        if (errores.length > 0) {
            console.log({ errores })
        } else {
            setLista([...lista, fields]);
            setFields({
                campo1: '',
                campo2: '',
                campo3: '',
                campo4: '',
                campo5: '',
            })
            console.log(lista)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Se ha enviado la lista de proveedores")
        setLista('')
    }
    return (
        <>
            <Navbar title="Primera vista" />
            <Box style={{ padding: "15px", textAlign: "center" }}>
                <Typography variant="h5" style={{ color: "grey" }}>Datos anteriores 1</Typography>
                <Typography variant="h5" style={{ color: "grey" }}>Datos anteriores 2</Typography>
            </Box>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>

                    <Box style={{ margin: "25px auto", width: "90%" }}>
                        <form className="formulario" onSubmit={handleSubmit} >
                            <Box style={{ display: "flex", flexFlow: "column wrap", padding: "10px" }}>

                                <TextField
                                    label="Proveedor"
                                    name="campo1"
                                    id="campo1"
                                    placeholder="Escriba el  proveedor"
                                    value={fields.campo1}
                                    onChange={handleChange}
                                    style={{ margin: "5px" }}
                                />
                                <TextField
                                    label="RIF"
                                    name="campo2"
                                    id="campo2"
                                    placeholder="Escriba el campo2"
                                    value={fields.campo2}
                                    onChange={handleChange}
                                    style={{ margin: "5px" }}
                                />
                                <TextField
                                    label="Producto"
                                    name="campo3"
                                    id="campo3"
                                    placeholder="Escriba el campo3"
                                    value={fields.campo3}
                                    onChange={handleChange}
                                    style={{ margin: "5px" }}
                                />
                                <TextField
                                    label="Precio"
                                    name="campo4"
                                    id="campo4"
                                    placeholder="Escriba el campo4"
                                    value={fields.campo4}
                                    onChange={handleChange}
                                    style={{ margin: "5px" }}
                                />
                                <TextField
                                    label="Descripcion"
                                    name="campo5"
                                    id="campo5"
                                    placeholder="Escriba el campo5"
                                    value={fields.campo5}
                                    onChange={handleChange}
                                    style={{ margin: "5px" }}
                                />
                                <IconButton onClick={handleAdd} color="primary">
                                    <AddIcon />
                                </IconButton>
                                <Button type="submit" color="primary" variant="contained">Enviar</Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            {lista && (
                <Typography variant="h4">Proveedores registrados</Typography>
            )}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {lista && lista.map((item, index) => (<>
                    <ListItem alignItems="flex-start" key={`${item.campo1}-${index}`}>
                        <ListItemAvatar>
                            <Avatar>{item.campo1.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.campo1}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.campo3}
                                    </Typography>
                                    {item.campo5}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
                ))}
            </List>
        </>
    )
}

export default second
