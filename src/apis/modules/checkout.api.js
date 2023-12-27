import privateClient from "../client/private.client.js";

const checkoutEndpoint = {
  checkout: `Checkout/create`,
  getByUser: ({ user_id }) => `Checkout/list/${user_id}`,
  getDetail: ({ id }) => `Checkout/detail/${id}`,
  vnpay: `Checkout/vnpay`
};

const checkoutApi = {
  checkoutCod: async ({
    user_id, data, address, total, email, payment, status, phoneNumber, name
  }) => {
    try {
      const response = await privateClient.post(
        checkoutEndpoint.checkout, {
          user_id, data, address, total, email, payment, status, phoneNumber, name
        });
      return { response };
    } catch (err) { return { err }; }
  },
  getList: async ({
    user_id
  }) => {
    try {
      const response = await privateClient.get(
        checkoutEndpoint.getByUser({ user_id }));
      return { response };
    } catch (err) { return { err }; }
  },
  getDetail:  async ({
    id
  }) => {
    try {
      const response = await privateClient.get(
        checkoutEndpoint.getDetail({ id }));
      return { response };
    } catch (err) { return { err }; }
  },
  vnpay: async ({ total, data }) => {
    try {
      const response = await privateClient.post(checkoutEndpoint.vnpay, { total, data });
      return { response };
    } catch (err) {
      return { err };
    }
  }
};

export default checkoutApi;