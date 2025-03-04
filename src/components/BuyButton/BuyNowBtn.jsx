import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNowBtn = ({ product }) => {
  const { addToCart, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBuyNowClick = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    await addToCart(
      product._id,
      product.title,
      product.description,
      product.price,
      1,
      product.imgSrc
    );

    navigate("/checkout");
  };

  return (
    <button onClick={handleBuyNowClick} className="btn btn-success">
      Buy Now
    </button>
  );
};

export default BuyNowBtn;
