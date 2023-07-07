import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "https://chathere-io.vercel.app/",
  },
});

io.on("connection", (socket) => {
  console.log("Socket: ", socket);

  socket.on("chat", (payload) => {
    console.log("Payload", payload);

    io.emit("chat", payload);
  });
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Connected on PORT 5000 roii`);
});
