export default function errorHandler(error, req, res, next) {
    console.log(error)
    return res.json({
        status: 500,
        method: req.method, /*  El metodo del error */
        path: req.url,
        response: error.message,
    })
}