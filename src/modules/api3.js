import axios from "axios";

const fetchData = async (path, data) => {
  let url = `https://test.gstat.fr/api/pwa/` + path;

  if (data) {
    data.forEach((element) => {
      url = url + "/" + element;
    });
  }

  try {
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Utilisateur non reconnu");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
