import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios
    .get(`https://ds-v2-api.vercel.app/products`)
    .catch((error) => {
      console.log("Error: ", error);
    });
  return response;
};

export const fetchInventory = async (token) => {
  const response = await axios
    .get(`https://ds-v2-api.vercel.app/users/inventory`, {
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
    .post(`https://ds-v2-api.vercel.app/users/login`, {
      username: username,
      password: password,
    })
    .catch((error) => error);

  return response;
};

export const fetchProductDetails = async (productId) => {
  const response = await axios
    .get(`https://ds-v2-api.vercel.app/products/${productId}`)
    .catch((error) => console.log("Error: ", error));

  return response;
};

export const updateProductDetails = async (productId, product) => {
  const response = await axios
    .patch(`https://ds-v2-api.vercel.app/products/${productId}`, product)
    .catch((error) => console.log("Error: ", error));
  return response;
};

export const deleteAccessToken = async (token) => {
  const response = await axios
    .delete(`https://ds-v2-api.vercel.app/users/logout`, {
      token: token,
    })
    .catch((error) => console.log("Error: ", error));
  return response;
};

export const addFavorite = async (token, product) => {
  try {
    const response = await axios.post(
      `https://ds-v2-api.vercel.app/users/favorites`,
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
      "https://ds-v2-api.vercel.app/users/favorites",
      config
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
