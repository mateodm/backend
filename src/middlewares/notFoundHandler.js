export default function notFoundHandler (req, res, next) {
    return res.json({
        status: 404,
        method: req.method,
        path: req.url,
        response:"Not found"
    })
}