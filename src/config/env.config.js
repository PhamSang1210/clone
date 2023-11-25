import "dotenv/config";

const ENV = {
    PORT: process.env.PORT || 8000,
    NODE_DEV: process.env.NODE_ENV || "dev",
};

export { ENV };
