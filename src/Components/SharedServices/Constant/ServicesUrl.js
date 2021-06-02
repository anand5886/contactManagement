//const baseUrl = 'https://r6ic7nlj8f.execute-api.ap-south-1.amazonaws.com/Prod/api/HRMS/';
const baseUrl = "https://localhost:44317/api/HRMS/";
//const baseUrl = 'https://s68mul9gu7.execute-api.ap-south-1.amazonaws.com/Prod/api/HRMS/';

export const ServiceUrl = {
  VALIDATE_USER: baseUrl + "Login/ValidateUser",

  GET_CONTACTS: baseUrl + "Contacts/GetContacts",
  SAVE_CONTACT: baseUrl + "Contacts/SaveContact",

  GET_USER_ROLE_FUNCTIONLITY: baseUrl + "Login/GetUserRoleFunctionlity",
};
