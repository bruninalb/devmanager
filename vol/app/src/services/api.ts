import axios from "axios";

export const api = axios.create({
    baseURL: 'http://solution4apps.com:3011/api/public/api',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export const storage = 'http://solution4apps.com:3011/api/storage/app/'

export const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]