export default function handler(req, res) {

    const url = `${process.env.BASE_URL}/oportunidades`


    res.status(200).json({ message: 'Exito' })
}