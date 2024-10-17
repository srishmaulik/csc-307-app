import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
   const[characters, setCharacters] = useState([]);
   useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
   return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);  

   
     
function removeOneCharacter(id) {
  fetch(`http://localhost:8000/users/${id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 204) {
      // Successful deletion
      const updatedCharacters = characters.filter((character) => character.id !== id);
      setCharacters(updatedCharacters);
    } else if (response.status === 404) {
      // Resource not found
      console.error('Resource not found.');
    } else {
      // Other error
      console.error('An error occurred during deletion.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }
     function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
  }
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }
  
	
}


export default MyApp;
