import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const AddToCartBtn = ({ product }) => {
  const { addToCart, isAuthenticated } = useContext(AppContext);
  const [buttonState, setButtonState] = useState("Add to Cart");
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (buttonState === "Add to Cart") {
      await addToCart(
        product?._id,
        product?.title,
        product?.description,
        product?.price,
        1,
        product?.imgSrc
      );
      setButtonState("Go to Cart");
    } else if (buttonState === "Go to Cart") {
      navigate("/cart");
    }
  };

  return (
    <button onClick={handleButtonClick} className="btn btn-warning">
      {buttonState === "Go to Cart" ? (
        <FontAwesomeIcon icon={faSquareCheck} />
      ) : null}
      {buttonState}
    </button>
  );
};

export default AddToCartBtn;
