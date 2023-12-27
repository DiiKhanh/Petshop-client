import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";


const userEndpoints = {
  signin: "Authenticate/login",
  signup: "Authenticate/register",
  verify: ({ token }) => `Authenticate/verify/${token}`,
  changePassword: "Authenticate/change-password",
  forgotPassword: ({ email }) => `Authenticate/forgot-password?email=${email}`,
  resetPassword: "Authenticate/reset-password",
  getInfo: "Authenticate/info"
};

const userApi = {
  signin: async ({ email, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signin,
        { email, password }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  signup: async ({ username, email, password, phoneNumber, firstName, lastName }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, email, password, phoneNumber, firstName, lastName }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  verify: async ({ token }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.verify({ token })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  forgotPassword: async ({ email }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.forgotPassword({ email })
      );
      return { response };
    } catch (err) { return { err }; }
  },
  resetPassword: async ({ token, newPassword, confirmNewPassword }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.resetPassword,
        { token, newPassword, confirmNewPassword }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  changePassword: async ({ currentPassword, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.post(
        userEndpoints.changePassword,
        { currentPassword, newPassword, confirmNewPassword }
      );
      return { response };
    } catch (err) { return { err }; }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {return { err };}
  }
};

export default userApi;