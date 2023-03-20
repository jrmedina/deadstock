import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios
    .get(`https://deadstock-v2-api.vercel.app/products`)
    .catch((error) => {
      console.log("Error: ", error);
    });
  return response;
};


export const fetchInventory = async (token) => {
  const response = await axios
    .get(`https://deadstock-v2-api.vercel.app/users/inventory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
  return response;
};

export const authenticateRequest = async (username, password) => {
  const response = await axios
    .post(`https://deadstock-v2-api.vercel.app/users/login`, {
      username: username,
      password: password,
    })
    .catch((error) => error);
  return response;
};

export const fetchProductDetails = async (productId) => {
  const response = await axios
    .get(`https://deadstock-v2-api.vercel.app/products/${productId}`)
    .catch((error) => console.log("Error: ", error));
  return response;
};
