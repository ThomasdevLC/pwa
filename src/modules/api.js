import axios from "axios";

const getData = async (year, month, id) => {
  try {
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

const vendorsApi = async () => {
  try {
    const response = await axios.get(`https://test.gstat.fr/api/pwa/vendors`);
    console.log("vendors api", response);
    if (!response.data) {
      throw Error("Pas de données disponibles");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const storesApi = async () => {
  try {
    const response = await axios.get(`https://test.gstat.fr/api/pwa/stores`);
    console.log("stores api", response);
    if (!response.data) {
      throw Error("Pas de données disponibles");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getData, vendorsApi, storesApi };
