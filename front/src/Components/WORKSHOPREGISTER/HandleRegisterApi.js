import axios from "axios";

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send the data using Axios
    axios.post('/submitForm', data)
      .then((response) => {
        alert('Form data submitted successfully!');
        // Handle success response if needed
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Handle error response if needed
      });
  }

  document.getElementById('registrationForm').addEventListener('submit', handleSubmit);
