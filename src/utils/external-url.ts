import axios from "axios";

export const eventPostRequest = (url, data) => {
    return axios({
        method: "POST",
        url,
        data,
    });
};
