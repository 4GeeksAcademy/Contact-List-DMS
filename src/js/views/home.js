import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    actions.getContacts();
    // window.location.reload();
  }, []);


  const handleAddContact = () => {
    actions.addContact(
      newContact.name,
      newContact.phone,
      newContact.email,
      newContact.address
    )
    setNewContact({ name: "", phone: "", email: "", address: "" });
};

const handleInputChange = (e) => {
  setNewContact({ ...newContact, [e.target.name]: e.target.value });
};

console.log("store", store.contacts)

return (
  <div className="d-flex flex-column align-items-center">
    <h1>Contact List</h1>


    <div className="contact-form text-center">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newContact.address}
          onChange={handleInputChange}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>


      <ul className="list-unstyled">
        {store.contacts.length ? (
          store.contacts.map((contact) => (
    <div className="card mb-3" key={contact.id} style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          {/* Placeholder for an avatar */}
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: "100px", height: "100px" }}
          >
            {contact.name[0]}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/contact/${contact.id}`} className="text-decoration-none">
                {contact.name}
              </Link>
            </h5>
            <p className="card-text">
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {contact.email}
            </p>
            <p className="card-text">
              <small className="text-muted">{contact.address}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </ul>
    </div>
  </div>
);
};
