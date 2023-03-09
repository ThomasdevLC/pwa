import axios from "axios";

const getYearData = async (year, month, id) => {
  try {
    const response = await axios.get(
      `https://test.gstat.fr/api/pwa/vendorStat/${year}/year/${id}`
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

export default getYearData;
