import { StatusCodes, ReasonPhrases } from "http-status-codes";

const ReaseStatusCode = {
    FORBIDDEN: "bad error reponse",
    CONFLIC: "FORBIDDEN",
};

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class BadRequestResponse extends ErrorResponse {
    constructor(
        message = ReaseStatusCode.CONFLIC,
        status = StatusCodes.FORBIDDEN
    ) {
        super(message, status);
    }
}

class ConflicRequest extends ErrorResponse {
    constructor(
        message = ReaseStatusCode.CONFLIC,
        status = StatusCodes.FORBIDDEN
    ) {
        super(message, status);
    }
}

class AuthFailure extends ErrorResponse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        status = StatusCodes.UNAUTHORIZED
    ) {
        super(message, status);
    }
}

export { BadRequestResponse, ConflicRequest, AuthFailure };
