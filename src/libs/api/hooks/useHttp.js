import {http} from "../http";
import {makeUseAxios} from "axios-hooks";

const useHttp = makeUseAxios({
  axios: http
})

export { useHttp }
