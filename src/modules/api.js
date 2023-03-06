import axios from "axios";

const getData = async (year, month, id) => {
  try {
    const response = await axios.get(
      `     https://test.gstat.fr/api/pwa/vendorStat/${year}/${month}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getData;
