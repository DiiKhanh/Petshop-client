import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";


const commentEndpoint = {
  create: "Comment/create",
  getComment: ({ product_id }) => `Comment/product-comment/${product_id}`
};

const commentApi = {
  create: async ({ product_id, user_id, content, type, username }) => {
    try {
      const response = await privateClient.post(
        commentEndpoint.create, ({ product_id, user_id, content, type, username })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getComment: async ({ product_id, type }) => {
    try {
      const response = await publicClient.post(
        commentEndpoint.getComment({ product_id }), ({ type })
      );
      return { response };
    } catch (err) { return { err }; }
  }
};

export default commentApi;