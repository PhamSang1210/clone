import mongoose from "mongoose";
import { countConnection } from "../helpers/checkConnect.config.js";
import mongodbConfig from "../config/mongodb.config.js";

const { TYPEDB, host, port, name_db } = mongodbConfig.db;

const stringConnect = `${TYPEDB}://${host}:${port}/${name_db}`;

class Database {
    constructor() {
        this.connect();
    }

    async connect(TYPE = "MONGODB") {
        // gia su moi truong dev
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        try {
            await mongoose.connect(stringConnect);
            console.log(`Success <3`);
            console.log("Num Connect: ", countConnection());
        } catch (error) {
            console.log(`Failure !!!!!`);
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceConnection = Database.getInstance();

export default instanceConnection;
