import axios from 'axios';  // Assurez-vous d'avoir importé axios.

export const fetchData = async (path, data = []) => {
    const baseUrl = import.meta.env.VITE_API_URI;
    const fullPath = `${baseUrl}${path}/${data.join('/')}`;

    try {
        const response = await axios.get(fullPath);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
