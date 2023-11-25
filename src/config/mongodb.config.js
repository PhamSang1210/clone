import { ENV } from "./env.config.js";

const dev = {
    app: {
        port: ENV.PORT,
    },
    db: {
        TYPEDB: "mongodb",
        host: "localhost",
        port: "27017",
        name_db: "shopSimple",
    },
};
const pro = {
    app: {
        port: ENV.PORT,
    },
    db: {
        TYPEDB: "mongodb",
        host: "localhost",
        port: "27017",
        name_db: "proEducation",
    },
};

const configDB = { dev, pro };
const env = ENV.NODE_DEV;

export default configDB[env];
