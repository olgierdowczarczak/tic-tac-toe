import { updateApi } from "../lib/api";
import { setSocketToken } from "../lib/socket";

export default function (data) {
    const { token } = data;
    localStorage.setItem("id", data._id);
    localStorage.setItem("token", token);
    localStorage.setItem("currentGame", data.currentGame);
    updateApi(token);
    setSocketToken(token);
}
