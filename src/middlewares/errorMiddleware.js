import Errorss  from "../service/error/errors.js"

export default function errorMidleware(error, req, res, next) {
    console.log(error.cause)
    console.log(error)
    switch (error.code) {
        case Errorss.INVALID_TYPE_ERROR: return res.json({ success: false, error: error.name, cause: error.cause })
            break;
        case Errorss.PARAMS_MISSING_ERROR: return res.json({ success: false, error: error.name, cause: error.cause })
            break;
        case Errorss.DATABASE_ERROR: return res.json({ success: false, error: error.name, cause: error.cause })
            break;
        case Errorss.ROUTING_ERROR: return res.json({ success: false, error: error.name })
            break;
        default: res.send({ success: false, error: "Unknown error", status: 400 })
            break;
    }
}