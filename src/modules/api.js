import axios from "axios";

export const fetchData = async (path, data) => {
    let url = import.meta.env.VITE_API_URI + path;

    if (data) {
        data.forEach((element) => {
            url = url + "/" + element;
        });
    }

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default fetchData;
