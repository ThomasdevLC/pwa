import axios from "axios";

const getTest = (id) => {
  const test = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://jsonplaceholder.typicode.com/posts/" + id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return { test };
};

export default getTest;
