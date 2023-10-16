// eslint-disable-next-line
import axios from "axios";
const baseUrl = "http://localhost:3001/getuserworkhsops";
const token = localStorage.getItem('access_token');
const userId = localStorage.getItem('userId');


const getChat = (userId, setUserws) => {
  axios
    .get(`${baseUrl}/${userId}`, {
      headers: {
        token: `Bearer ${token}`,
      },

    })
    .then(({ data }) => {
      console.log("user id:", userId);
      console.log('data --->', data);
      setUserws(data);
    })
    .catch((err) => console.log(err));
};

export { getChat };