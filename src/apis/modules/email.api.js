import privateClient from "../client/private.client.js";

const emailEnpoint = {
  checkout: `Checkout/send`
};

const emailApi = {
  checkoutEmail: async ({
    address, total, email, phone, name
  }) => {
    try {
      const response = await privateClient.post(
        emailEnpoint.checkout, {
          address, total, email, phone, name
        });
      return { response };
    } catch (err) { return { err }; }
  }
};

export default emailApi;