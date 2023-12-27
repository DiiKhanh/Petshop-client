import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";


const voucherEndpoint = {
  useVoucher: ({ code }) => `Voucher/get/${code}`,
  get: "Voucher/list"
};

const voucherApi = {
  getVoucher: async ({ code }) => {
    try {
      const response = await privateClient.get(
        voucherEndpoint.useVoucher({ code })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getAll: async () => {
    try {
      const response = await publicClient.get(
        voucherEndpoint.get);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default voucherApi;