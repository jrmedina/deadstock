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
    .catch((error) => error);

  return response;
};

export const fetchProductDetails = async (productId) => {
  const response = await axios
    .get(`http://localhost:3001/products/${productId}`)
    .catch((error) => console.log("Error: ", error));

  return response;
};

export const updateProductDetails = async (productId, product) => {
  const response = await axios
    .patch(`http://localhost:3001/products/${productId}`, product)
    .catch((error) => console.log("Error: ", error));
  return response;
};

export const deleteAccessToken = async (token) => {
  const response = await axios
    .delete(`http://localhost:3001/users/logout`, {
      token: token,
    })
    .catch((error) => console.log("Error: ", error));
  return response;
};

export const addFavorite = async (token, product) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/users/favorites`,
      { ...product },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteFavorite = async (token, product) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: product,
  };

  try {
    const response = await axios.delete(
      "http://localhost:3001/users/favorites",
      config
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

