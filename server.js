import app from "./src/app.js";
import { ENV } from "./src/config/env.config.js";
const PORT = ENV.PORT;

const server = app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log(`Expresss Shutdown !!!`);
    });
});
