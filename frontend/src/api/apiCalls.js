import axios from "axios";


export const singup = (body) => {
    return axios.post("/api/1.0/users/add", body)
}

// , { headers: { 'accept-language': 'en' } }
export const changeLanguageInApiCalls = language => {
    axios.defaults.headers['accept-language'] = language;
}