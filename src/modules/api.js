import axios from "axios";
import { ref } from "vue";

const getTest = (id) => {
  const post = ref([]);
  const error = ref(null);

  const test = async () => {
    try {
      let resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      console.log(resp);

      post.value = await resp.data;
    } catch (err) {
      console.error(err);
      error.value = err.message;
    }
  };

  return { post, error, test };
};

export default getTest;
