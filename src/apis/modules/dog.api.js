import publicClient from "../client/public.client";

const endpoints = {
  getAll: ({ type }) => `DogItems/get-all/${type}`,
  getDetail: ({ id }) => `DogItems/get-dog/${id}`
};

const dogApi = {
  getAll: async ({ type }) => {
    try {
      const response = await publicClient.get(
        endpoints.getAll({ type })
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