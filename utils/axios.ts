import axios, { AxiosInstance } from 'axios'

// Créez une instance d'Axios avec une URL de base pour les requêtes
const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    // Vous pouvez également ajouter d'autres configurations ici, comme les en-têtes, les intercepteurs, etc.
})

export default instance
