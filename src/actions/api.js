import axios from "axios";

export  function getData() {
    return  axios.get("https://api.exchangerate.host/latest").then(response => response.data);
}