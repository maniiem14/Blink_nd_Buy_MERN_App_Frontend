import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import AddressForm from "./AddressForm";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../../context/AppContext";

const Address = () => {
  const { url, setSelectedAddress } = useContext(AppContext);
  const [userAddresses, setUserAddresses] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${url}/address/addresses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setUserAddresses(response.data.userAddress);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Select Address & Navigate to Checkout
  const selectAddress = (address) => {
    setSelected(address);
    setSelectedAddress(address);
    navigate("/checkout");
  };

  // Open modal for editing
  const handleEdit = (address, e) => {
    e.stopPropagation();
    setEditingAddress(address);
    setModalShow(true);
  };

  // Open modal for adding new address
  const handleAddNew = () => {
    setEditingAddress(null);
    setModalShow(true);
  };

  // Delete Address
  const handleDelete = async (addressId, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${url}/address/delete/${addressId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        setUserAddresses(
          userAddresses.filter((addr) => addr._id !== addressId)
        );
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Choose Your Delivery Address</h2>

      {/* Add New Address Button */}
      <div className="text-center">
        <button className="btn btn-primary mt-3" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faPlus} /> Add New Address
        </button>
      </div>

      {/* Address Modal */}
      <AddressForm
        show={modalShow}
        handleClose={() => setModalShow(false)}
        setUserAddresses={setUserAddresses}
        editingAddress={editingAddress}
      />

      {/* Address List */}
      <div className="row mt-4">
        {userAddresses.length > 0 ? (
          userAddresses.map((address) => (
            <div
              key={address._id}
              className={`col-md-6 col-lg-4 mb-3 ${
                selected === address ? "selected-address" : ""
              }`}
              onClick={() => selectAddress(address)}
              style={{ cursor: "pointer" }}
            >
              <div className="card p-3 shadow border-0 rounded-lg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{address.fullName}</h5>
                  {selected === address && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success"
                    />
                  )}
                </div>
                <p>
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.country} - {address.pincode}
                </p>
                <p>
                  <strong>Phone:</strong> {address.phoneNumber}
                </p>

                {/* Edit Button */}
                <button
                  className="btn btn-dark w-100 mt-2"
                  onClick={(e) => handleEdit(address, e)}
                >
                  <FontAwesomeIcon icon={faPen} /> Edit
                </button>

                {/* Delete Button */}
                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={(e) => handleDelete(address._id, e)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">No addresses found.</p>
        )}
      </div>
    </div>
  );
};

export default Address;
