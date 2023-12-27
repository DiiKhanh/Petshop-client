import privateClient from "../client/private.client.js";


const bookingEnpoint = {
  create: "Appointment/create",
  get: ({ user_id }) => `Appointment/all/${user_id}`,
  cancel: ({ id }) => `Appointment/update/${id}`
};

const bookingApi = {
  create: async ({ user_name, dog_item_id, phone_number, service, date, hour, description, user_id }) => {
    try {
      const response = await privateClient.post(
        bookingEnpoint.create, ({ user_name, dog_item_id, phone_number, service, date, hour, description, user_id })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getAll: async ({ user_id }) => {
    try {
      const response = await privateClient.get(
        bookingEnpoint.get({ user_id })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  cancel:  async ({ id }) => {
    try {
      const response = await privateClient.put(
        bookingEnpoint.cancel({ id }), { result: "Hủy lịch" }
      );
      return { response };
    } catch (err) { return { err }; }
  }
};

export default bookingApi;