"use strict";

const URL = "https://randomuser.me/api";

const fetchRandomUser = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    throw error;
  }
};

const updatePersonElement = (person, personData) => {
  const { picture, location, name } = personData;
  const { city, country, postcode } = location;

  person.innerHTML = `
    <img src="${picture.large}" alt="Profile picture" />
    <p>City: ${city}</p>
    <p>Country: ${country}</p>
    <p>Name: ${Object.values(name).join(" ")}</p>
    <p>Post Code: ${postcode}</p>
  `;
};

const handleSuccess = () => {
  const messageDiv = document.getElementById("messageDiv");
  const message = document.createElement("p");
  message.innerHTML = "Success!";
  message.id = "successMessage";
  messageDiv.appendChild(message);
};

const handleError = (error) => {
  const messageDiv = document.getElementById("messageDiv");
  const message = document.createElement("p");
  message.innerHTML = `${error}`;
  messageDiv.appendChild(message);
};

document.getElementById("button").onclick = async () => {
  const people = document.getElementsByClassName("person");
  const existingSuccessMessage = document.getElementById("successMessage");

  if (existingSuccessMessage) {
    existingSuccessMessage.remove();
  }

  try {
    let successCount = 0;

    for (let person of people) {
      const personData = await fetchRandomUser();
      updatePersonElement(person, personData);
      successCount++;

      if (successCount === people.length) {
        handleSuccess();
      }
    }
  } catch (error) {
    handleError(error);
  }
};
