import axios from "axios";
import { ref } from "vue";

const getDatas = (year, month, id) => {
  const stats = ref([]);
  const error = ref(null);

  const statDatas = async () => {
    try {
      let resp = await axios.get(
        `https://test.gstat.fr/api/pwa/vendorStat/${year}/${month}/${id}`
      );
      console.log(resp.data);

      stats.value = await resp.data;
    } catch (err) {
      console.error(err);
      error.value = err.message;
    }
  };

  return { stats, error, statDatas };
};

export default getDatas;
