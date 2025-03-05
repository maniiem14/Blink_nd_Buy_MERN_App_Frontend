import React, { lazy, Suspense, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ShowProduct.css";
import AppContext from "../../../context/AppContext";
import { Link } from "react-router-dom";
import AddToCartBtn from "../../AddToCartBtn/AddToCartBtn";
import Categories from "../../Categories/Categories";

const BannerCarousel = lazy(() => import("../../Banner/BannerCarousel"));

const ShowProduct = () => {
  const { filteredData, setfilteredData, products } = useContext(AppContext);
  const location = useLocation();
  // const navigate = useNavigate();

  // Extract category from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    if (category) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setfilteredData(filtered);
    } else {
      setfilteredData(products); // Show all products when no category is selected
    }
  }, [location.search, products, setfilteredData]);

  return (
    <div>
      <Suspense>
        <BannerCarousel />
      </Suspense>

      <div className="container">
        {/* Show Categories for Filtering */}
        <Categories />
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            {location.search.includes("category=") && (
              <li className="breadcrumb-item active" aria-current="page">
                {new URLSearchParams(location.search).get("category")}
              </li>
            )}
          </ol>
        </nav>
        
        <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: "5px" }}>
          Explore Products
        </h1>

        <div className="row overflow-hidden" style={{ height: "100%" }}>
          {filteredData?.length === 0 ? (
            <div className="col-12 text-center">
              <p>No products available for this category.</p>
            </div>
          ) : (
            filteredData?.map((product) => (
              <div key={product?._id} className="col-lg-4 col-sm-6 my-3">
                <div className="card text-center" role="button" style={{ height: "100%" }}>
                  <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center">
                    <div className="image-container">
                      <img src={product.imgSrc} className="card-img-top" alt={product.title} loading="lazy" />
                    </div>
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text" style={{ flexGrow: 1 }}>{product.description}</p>
                    <div className="d-flex justify-content-between gap-4">
                      <button className="btn btn-primary">₹ {product.price}</button>
                      <AddToCartBtn product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
