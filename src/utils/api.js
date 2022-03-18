import axios from "axios";

export const getApi = async () => {
  const accessKey = process.env.REACT_APP_API_ACCESS_KEY;

  const response = await axios.get(`${process.env.REACT_APP_CURRENCY_API_URL}/live?access_key=${accessKey}`);

  return response.data;
};
