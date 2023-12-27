import publicClient from "../client/public.client";

const endpoints = {
  getAll: "DogItems/get-all",
  getDetail: ({ id }) => `DogItems/get-dog/${id}`
};

const dogApi = {
  getAll: async () => {
    try {
      const response = await publicClient.get(
        endpoints.getAll
      );
      return { response };
    } catch (err) {
      return { err };}
  },
  getDogDetail: async ({ id }) => {
    try {
      const response = await publicClient.get(
        endpoints.getDetail({ id })
      );
      return { response };
    } catch (err) {
      return { err };}
  }
};

export default dogApi;