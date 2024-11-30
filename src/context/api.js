import axios from "axios";

export const getAuth = axios.create({
    baseURL: 'http://192.168.192.1:3000/api/v1',
  });
