import axios from "axios";


export const singup = (body) => {
    return axios.post("/api/1.0/users/add", body)
}


export const login = creds=>{
    return axios.post('/api/1.0/users/auth',{},{auth:creds});
}

// , { headers: { 'accept-language': 'en' } }
export const changeLanguageInApiCalls = language => {
    axios.defaults.headers['accept-language'] = language;
}