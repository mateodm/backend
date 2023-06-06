
let userName;

Swal.fire({
    title: "Escribe tu nombre",
    input: "text",
    allowOutsideClick: false,
    inputValidator: value => !value && "escribe tu nombre"
}).then((res) => {
    userName = res.value;
    document.getElementById("username").innerHTML = userName;
    socket.emit("auth", userName);
});

socket.on("allMessages", (data) => {
    document.getElementById("message").innerHTML = data.map((message) => `<br><span><b>${message.userName}</b><span>: ${message.message} </br>` ).join("")
    ;
});

let chatBox = document.getElementById("chatbox");
chatBox.addEventListener("keyup", enterR);
socket.emit("auth", userName);

function enterR(e) {
    if (e.key === "Enter") {
        socket.emit("nuevo_mensaje", { userName, message: chatBox.value });
    }
}
