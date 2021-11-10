const seleccion = (res) => {

    // Query
    const sql = `SELECT clientes.*, 
                    clientes_direcciones_entrega.id AS iddireccion,
                    clientes_direcciones_entrega.direccion 
                FROM clientes 
                LEFT OUTER JOIN clientes_direcciones_entrega ON clientes.id=clientes_direcciones_entrega.idcliente 
                ORDER BY id, iddireccion`;

    // Array de usuarios
    const usuarios = [];

    // Se ejecuta el query
    connection.query(sql, (error, results) => {
        // Si existe algunn error, se hace un exception
        if (error) throw error;

        // Si el recordset trae al menos un registro
        if (results.length > 0) {
            // Bucle para crear el object
            results.forEach(element => {
                // Objeto de usuario
                const usuario = {
                    id: element.id,
                    nombre: element.nombre,
                    rif: element.rif,
                    direccionfiscal: element.direccionfiscal,
                    telefonos: element.telefonos,
                    email: element.email,
                    idcliente: element.id,
                    direcciones_entrega:
                        // AQUI SE SUPONE QUE DEBERIA HABER UN MAP PARA RECORRER LAS DIRECCIONES
                        [
                            {
                                iddireccion: element.iddireccion,
                                direccion: element.direccion,
                            },
                        ]
                }
                // Se inserta en el array de usuarios
                usuarios.push(usuario);
            })
            // Objeto de respuesta
            const respuesta = {
                exito: "SI",
                mensaje: "Exito",
                data: usuarios
            }
            // Respuesta
            res.status(200).json(respuesta);
        } else {
            // Respuesta con si no existen registros
            res.status(200).json({ exito: "NO", mensaje: "No hay resultados" })
        }
    });
};