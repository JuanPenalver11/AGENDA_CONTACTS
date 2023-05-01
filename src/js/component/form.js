import {useParams} from "react-router";
import React, {useState, useEffect} from "react";

const Form = () => {

  const [fullname, setFullName] = useState ('');
  const [email, setEmail] = useState ('');
  const [address, setAddress] = useState ('');
  const [phone, setPhone] = useState ('');
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  useEffect (()=>{
    if(params.id){
      fetch(`https://assets.breatheco.de/apis/fake/contact/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error obtaining contact");
        }
        return response.json();
      })
      .then((data) => {
  
        setFullName(data.full_name);
        setEmail(data.email);
        setAddress(data.address);
        setPhone(data.phone)
        setIsEditing(true);
      })
      .catch((error) => console.error(error));
  }
}, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditing ? `https://assets.breatheco.de/apis/fake/contact/${params.id}` : "https://assets.breatheco.de/apis/fake/contact/";
    const method = isEditing ? "PUT" : "POST";
       


    const data = {
      full_name: fullname,
      email: email,
      agenda_slug:"Admiradores",
      phone: phone,
      address: address,
      
    };

    setFullName('');
    setEmail('');
    setAddress('');
    setPhone('');

    fetch(url, {
      method: method,
      headers:{"Content-type" : "application/json"},
      body: JSON.stringify(data)
    })

    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((response)=> alert ("You have added or edited a contact. Well done.", response))
    .catch((error) => alert(error));

  };


  return (
  
    <div className="d-flex justify-content-center">
      <form className="row g-3 m-5" onSubmit={handleSubmit}>
        <div className="col-6">
          <label htmlFor="inputFirstName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="What is your name and surname?"
            aria-label="Full Name"
            onChange={(e)=> setFullName(e.target.value)}
            value={fullname}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Don't forget your email address"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address line
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Street, house number,  city, country, PS"
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhoneNumber"
            placeholder="What is your Phone Number?"
            onChange={(e)=>setPhone(e.target.value)}
            value={phone}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" >

          {isEditing? "Edit Contact": "Add Contact"} 
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
