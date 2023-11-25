import _ from "lodash";
import moment from "moment-timezone";

const timed = moment
    .tz(Date.now(), "Asia/Ho_Chi_Minh")
    .format("DD-MM-YYYY HH:mm:ss");

const dateCreatedAt = {
    type: String,
    default: timed,
};

const dateUpdatedAt = {
    type: String,
    default: timed,
};

const getInfoData = (object, filded) => {
    return _.pick(object, filded);
};

export { dateCreatedAt, dateUpdatedAt, getInfoData };
