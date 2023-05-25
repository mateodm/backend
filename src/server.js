import server from "./app.js"
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080 /*  Si esta disponible el puerto 8080 utilizara el mismo, si no se usara otro. */

const ready = () => console.log("server ready on port " + PORT)
const http_server = server.listen(PORT, ready)
const socket_server = new Server(http_server)