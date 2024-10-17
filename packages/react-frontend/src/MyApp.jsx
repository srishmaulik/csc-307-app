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

   
function deleteUser(person){
  const promise = fetch(`http://localhost:8000/users/${person.id}`, {
    method: 'DELETE',
    });
    return promise;
  }
function removeOneCharacter(person) {
  console.log("Delete User with ID:", person.id);
  deleteUser(person)
  .then((response)=>{
    if (response.ok){
      const updatedCharacters = characters.filter((character) => character.id !== id);
      setCharacters(updatedCharacters);
    }else{console.log("failed");
    }
  }).catch((error)=>{console.log("error");

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
