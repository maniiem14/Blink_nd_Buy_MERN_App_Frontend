import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SearchItem.css";
import AppContext from "../../context/AppContext";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

const SearchItem = () => {
  const { products } = useContext(AppContext);
  const { term } = useParams();
  const [filterSearchItem, setFilterSearchItem] = useState([]);

  useEffect(() => {
    const filteredSearchItem = () => {
      const data = products.filter((p) => {
        const searchTermLower = term.toLowerCase();
        return (
          p.title.toLowerCase().includes(searchTermLower) ||
          p.description.toLowerCase().includes(searchTermLower) ||
          p.category.toLowerCase().includes(searchTermLower)
        );
      });

      setFilterSearchItem(data);
    };

    filteredSearchItem();
  }, [term, products]);

  return (
    <div>
      <span
        className="search-result"
        style={{
          fontWeight: "500",
          fontize: "20px",
          margin: "8px",
          display: "inline-block",
        }}
      >
        Search Results for: "{term}"
      </span>
      <div className="container text-center">
        <div className="container-fluid product-page">
          <div className="row">
            <div className="row overflow-hidden " style={{ height: "100%" }}>
              {filterSearchItem.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No products available for this category.</p>
                </div>
              ) : (
                filterSearchItem.map((product) => (
                  <div key={product.id} className="col-lg-4 col-sm-6 my-3">
                    <div
                      className="card text-center"
                      role="button"
                      style={{ height: "100%" }}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        className="d-flex justify-content-center align-items-center"
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
                        <div className="d-flex justify-content-between">
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
    </div>
  );
};

export default SearchItem;