import axios from "axios";

export default function callApi(endpoint, method, body) {
  return axios({
    method: method,
    //k bt back-end nen mock api
    url: `https://60c9fe3f772a760017204f9e.mockapi.io/api/${endpoint}`,
    data: body,
  }).catch((err) => console.log(err));
}
