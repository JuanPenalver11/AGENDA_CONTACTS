import React, { useState, useEffect} from "react";
import "../../styles/contact.css"
import { Link } from "react-router-dom";


const Contact = () => {

  const [contacts, setContact] = useState([]);

  useEffect(() => {
    getAllElements();
  }, [contacts]);

  const getAllElements = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://assets.breatheco.de/apis/fake/contact/agenda/Admiradores",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setContact(data))
      .catch((error) => console.log("error", error));
  };

  const DeleteContact = (id) => {
    
    fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
      method: "DELETE", 
      redirect: "follow"
    })
   
    .then((response)=>response.json()) 
    .then((data) => console.log(data))
    .catch((error)=>console.log("error", error))
   
   

  }

  return (
    <div className="row">
      <div className="col-6 m-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="card m-4">
            <div className="card-body">
              <>
                <h5 className="card-name">Full Name: {contact.full_name}</h5>
                <p className="card-email">Email: {contact.email}</p>
                <p className="card-addressline">Address line: {contact.address}:</p>
                <p className="card-phone">Phone: {contact.phone}</p>
              </>
              <Link to={`/edit-form/${contact.id}`}>
              <button href="#" className="btn btn-primary me-2">
                Edit
              </button>
              </Link>
              <button href="#" className="btn btn-primary" onClick={()=> DeleteContact(contact.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/">
        <button className="btn btn-primary ms-5">Back home</button>
      </Link>
    </div>
  );
};

export default Contact;