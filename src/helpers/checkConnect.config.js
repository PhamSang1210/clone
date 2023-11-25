import mongoose from "mongoose";
import os from "os";

const _SECONDS = 5000;

const countConnection = () => {
    const numConnect = mongoose.connections.length;
    return numConnect;
};

const checkOverLoad = () => {
    setInterval(() => {
        // Take core
        const core = os.cpus().length;
        // Take countConnection
        const countConnect = mongoose.connections.length;
        // memoryUsage
        const memoryUsage = process.memoryUsage().rss;
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

        const maxConnections = core * 5;
        if (countConnect > maxConnections) {
            console.log(`Server Overload !!!!!!`);
        }
    }, _SECONDS);
};

export { countConnection, checkOverLoad };
