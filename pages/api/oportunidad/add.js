export default async function handler(req, res) {
    const date = new Date();
    const {
        requerimiento,
        comentario,
        direccionentrega,
        idvendedor,
        nombrevendedor,
        idcliente,
        nombrecliente,
        montolead,
        fechaestimadacierre,
        prioridad_marca,
        prioridad_precio,
        prioridad_plazo,
        prioridad_garantia,
        detalles_oportunidad } = req.body;
    const datos = {
        idcliente: idcliente,
        nombrecliente: nombrecliente,
        requerimiento: requerimiento,
        comentario: comentario,
        direccionentrega: direccionentrega,
        prioridad_marca: prioridad_marca,
        prioridad_precio: prioridad_precio,
        prioridad_plazo: prioridad_plazo,
        prioridad_garantia: prioridad_garantia,
        idvendedor: idvendedor,
        nombrevendedor: nombrevendedor,
        montolead: montolead,
        fechaestimadacierre: fechaestimadacierre,
        fehcahora: date,
        detalle_oportunidad: detalles_oportunidad
    }
    const raw = JSON.stringify(datos)
    const url = `${process.env.BASE_URL}/oportunidades`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: raw
    }
    try {
        const respuesta = await fetch(url, options);
        if (respuesta.status === 200) {
            const data = await respuesta.json();
            res.status(200).json(data)
        } else {
            console.log(respuesta)
            res.status(500).json({ message: "Algo ocurrió con la solicitud" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Algo ocurrió con la solicitud" });
    }

}