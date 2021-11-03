export default async function handler(req, res) {

    const { datos } = req.body;
    const raw = JSON.stringify(datos)
    const url = `https://gesincorp.sgc-consultores.com.ve/oportunidades`
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
    }

}