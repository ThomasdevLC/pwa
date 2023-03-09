import axios from "axios";

const getData = async (year, month, id) => {
  try {
    console.log(
      `https://test.gstat.fr/api/pwa/vendorStat/${year}/${month}/${id}`
    );
    const response = await axios.get(
      `https://test.gstat.fr/api/pwa/vendorStat/${year}/${month}/${id}`
    );
    console.log("test api", response);
    if (!response.data) {
      throw Error("Pas de données disponibles");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getData;
