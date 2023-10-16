import axios from "axios";

const baseUrl = "http://localhost:3001/chat";


//const authToken = localStorage.getItem('access_token');

const chat = (setChat) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log('data --->', data);
      setWorkshops(data);
    })
    .catch((err) => console.log(err));
};

export { chat };
