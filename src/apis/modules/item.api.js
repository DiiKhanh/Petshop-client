import publicClient from "../client/public.client";

const endpoints = {
  getAll: "DogProductItem/get-all-dog-product-item",
  getDetail: ({ id }) => `DogProductItem/get-dog-product-item/${id}`
};

const itemApi = {
  getAllItems: async () => {
    try {
      const response = await publicClient.get(endpoints.getAll);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getItemDetail: async ({ id }) => {
    try {
      const response = await publicClient.get(endpoints.getDetail({ id }));
      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default itemApi;