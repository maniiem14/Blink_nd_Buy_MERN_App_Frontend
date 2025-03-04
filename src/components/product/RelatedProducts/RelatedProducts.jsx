import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../context/AppContext";
import { Link } from "react-router-dom";
import AddToCartBtn from "../../AddToCartBtn/AddToCartBtn";

const RelatedProducts = ({ category }) => {
  const { products } = useContext(AppContext);

  const [relatedProduct, setRelatedProduct] = useState([]);

  const categorySectionRef = useRef(null);

  useEffect(() => {
    if (category && products) {
      setRelatedProduct(
        products.filter(
          (data) => data.category?.toLowerCase() === category?.toLowerCase()
        )
      );
    } else {
      setRelatedProduct([]);
    }
  }, [category, products]);

  const scrollToCategory = () => {
    if (categorySectionRef.current) {
      categorySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1 style={{fontWeight: "bold"}}>Related Products</h1>

        <div className="container ">
          <div className="row">
            <div className="row overflow-hidden " style={{ height: "100%" }}>
              {relatedProduct?.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No products available for this category.</p>
                </div>
              ) : (
                relatedProduct?.map((product) => (
                  <div key={product._id} className="col-lg-4 col-sm-6 my-3">
                    <div
                      className="card text-center"
                      role="button"
                      style={{ height: "100%" }}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        className="d-flex justify-content-center align-items-center"
                        ref={categorySectionRef} onClick={scrollToCategory}
                      >
                        <div
                          className="image-container"
                          style={{ height: "200px", overflow: "hidden" }}
                        >
                          <img
                            src={product.imgSrc}
                            className="card-img-top"
                            alt={product.title}
                            style={{ height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text" style={{ flexGrow: 1 }}>
                          {product.description}
                        </p>
                        <div className="d-flex justify-content-between gap-4">
                          <button className="btn btn-primary">
                            ₹ {product.price}
                          </button>
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
      </div>
    </>
  );
};

export default RelatedProducts;
