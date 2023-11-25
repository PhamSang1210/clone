import accessRouter from "./Access/access.route.js";

function route(app) {
    app.use("/v1/api", accessRouter);
}

export default route;
