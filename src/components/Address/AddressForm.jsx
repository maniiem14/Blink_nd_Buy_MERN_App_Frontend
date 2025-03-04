import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AddressForm = ({
  show,
  handleClose,
  setUserAddresses,
  editingAddress,
}) => {
  const { url } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form when editing an address
  useEffect(() => {
    if (editingAddress) {
      setFormData(editingAddress);
    } else {
      setFormData({
        fullName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phoneNumber: "",
      });
    }
  }, [editingAddress, show]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (editingAddress) {
        // Update existing address
        response = await axios.put(
          `${url}/address/update/${editingAddress._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Add new address
        response = await axios.post(`${url}/address/add`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      if (response.data.success) {
        try {
          toast("Address Saved Successfully!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            theme: "colored",
          });
        } catch (error) {
          toast.error("Failed to save address!");
        }
        setUserAddresses((prev) =>
          editingAddress
            ? prev.map((addr) =>
                addr._id === editingAddress._id
                  ? response.data.updatedAddress
                  : addr
              )
            : [...prev, response.data.userAddress]
        );
        handleClose();
      }
    } catch (error) {
      console.error("Error saving address", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingAddress ? "Edit Address" : "Add New Address"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address" className="mt-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="city" className="mt-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="state" className="mt-2">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              isInvalid={!!errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="country" className="mt-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              isInvalid={!!errors.country}
            />
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="pincode" className="mt-2">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={handleChange}
              isInvalid={!!errors.pincode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.pincode}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mt-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              {editingAddress ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddressForm;
