import axios from "axios";

const apiURL = navigator.userAgent.includes("androidWebview") ? 'http://10.0.2.2:3001':'http://localhost:3001';

export default {
    createMessage: function (message, created_date) {
        return axios({ method: "post", url: apiURL + "/messages", data: { message, created_date } });
    },
    findAllMessages: function () {
        return axios({ method: "get", url: apiURL + "/messages" });
    },
    deleteOneMessage: function (messageID) {
        return axios({ method: "delete", url: apiURL + "/messages/" + messageID });
    }
};