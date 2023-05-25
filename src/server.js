import server from "./app.js"
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080 /*  Si esta disponible el puerto 8080 utilizara el mismo, si no se usara otro. */
const chat = []
const ready = () => console.log("server ready on port " + PORT)
const http_server = server.listen(PORT, ready)
const socket_server = new Server(http_server)
socket_server.on("connection", (socket) => {
    socket.on("auth", () => {
        return null;
    })
    socket.on("nuevo_mensaje", data => {chat.push(data)
    socket_server.emit("allMessages", chat)
    })
})