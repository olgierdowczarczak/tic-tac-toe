import { removeApiHeaders } from "../lib/api";
import { removeSocket } from "../lib/socket";

export default function () {
    localStorage.clear();
    removeApiHeaders();
    removeSocket();
}
