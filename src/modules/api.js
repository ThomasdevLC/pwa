import axios from "axios";

export const fetchData = async (path, data) => {
    // let url = `https://test.gstat.fr/api/pwa/` + path;
    let url = `http://localhost:8099/api/pwa/` + path;

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
