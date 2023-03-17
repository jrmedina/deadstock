import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios
    .get(`http://localhost:3001/products`)
    .catch((error) => {
      console.log("Error: ", error);
    });
  return response;
};


export const fetchInventory = async (token) => {
  const response = await axios
    .get(`http://localhost:3001/users/inventory`, {
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
    .post(`http://localhost:3001/users/login`, {
      username: username,
      password: password,
    })
    .catch((error) => console.log("Error: ", error));
  return response;
};

export const fetchProductDetails = async (productId) => {
  const response = await axios
    .get(`http://localhost:3001/products/${productId}`)
    .catch((error) => console.log("Error: ", error));
  return response;
};
