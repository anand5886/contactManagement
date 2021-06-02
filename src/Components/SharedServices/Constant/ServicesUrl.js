const baseUrl = "https://y08yf1jxc6.execute-api.ap-south-1.amazonaws.com/Prod/";
//const baseUrl = "https://localhost:44317/api/HRMS/";

export const ServiceUrl = {
  VALIDATE_USER: baseUrl + "Login/ValidateUser",

  GET_CONTACTS: baseUrl + "Contacts/GetContacts",
  SAVE_CONTACT: baseUrl + "Contacts/SaveContact",

  GET_USER_ROLE_FUNCTIONLITY: baseUrl + "Login/GetUserRoleFunctionlity",
};
