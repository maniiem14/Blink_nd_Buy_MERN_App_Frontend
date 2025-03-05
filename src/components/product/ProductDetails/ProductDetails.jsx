import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import AddToCartBtn from "../../AddToCartBtn/AddToCartBtn";
import BuyNowBtn from "../../BuyButton/BuyNowBtn";
import AppContext from "../../../context/AppContext";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const { url } = useContext(AppContext);


  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="container my-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          {product?.category && (
            <li className="breadcrumb-item">
              <Link to={`/?category=${product.category}`} className="text-decoration-none">
                {product.category}
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {product?.title}
          </li>
        </ol>
      </nav>

      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="img-fluid rounded shadow-lg"
            style={{ maxWidth: "60%", height: "auto" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6 mt-4">
          <h1 style={{fontSize: "clamp(1.2rem, 4vw, 2rem)",}}>{product?.title}</h1>
          <p className="text-muted">{product?.description}</p>
          <h2>₹{product?.price}</h2>

          {/* Buttons */}
          <div className="d-grid gap-3 d-md-flex mt-4">
            <BuyNowBtn product={product} />
            <AddToCartBtn product={product} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <RelatedProducts category={product?.category} />
      </div>
    </div>
  );
};

export default ProductDetails;

