import axios from "axios";

const fetchData = async (type, year, month, id) => {
  let url = `https://test.gstat.fr/api/pwa/`;
  switch (type) {
    case "vendorStat":
      url += `vendorStat/${year}/${month}/${id}`;
      break;
    case "vendors":
      url += "vendors";
      break;
    case "stores":
      url += "stores";
      break;
    case "user":
      url += `user/${id}`;
      break;
    default:
      throw new Error("Invalid type specified");
  }
  try {
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("No data available");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
