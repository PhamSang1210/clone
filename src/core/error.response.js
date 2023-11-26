const StatusCode = {
    FORBIDDEN: 403,
    CONFLIC: 409,
};

const ReasonStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLIC: "CONFLIC ERROR",
};

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflicRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLIC,
        status = StatusCode.FORBIDDEN
    ) {
        super(message, status);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLIC,
        status = StatusCode.FORBIDDEN
    ) {
        super(message, status);
    }
}

export { ConflicRequestError, BadRequestError };
