import axios from "axios";

const baseUrl = "http://localhost:3001/allworkshop";
const baseUrl1 = "http://localhost:3001/getworkshop";


//const authToken = localStorage.getItem('access_token');

const getAllWorkshops = (setWorkshops) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log('data --->', data);
      setWorkshops(data);
    })
    .catch((err) => console.log(err));
};


const getWorkshopById = (id,setWorkshop) => {
  axios
    .get(`${baseUrl1}/${id}`)
    .then(({ data }) => {
      console.log("Workshop id:", id);
      console.log('data --->', data);
      setWorkshop(data);
    })
    .catch((err) => console.log(err));
};



export { getAllWorkshops, getWorkshopById };
