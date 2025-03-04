import React, { useContext, useCallback, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Categories.css";

const Categories = () => {
  const { setfilteredData, products } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const categorySectionRef = useRef(null);

  const categories = useMemo(
    () => [
      {
        name: "Grocery",
        value: "grocery",
        imgSrc: "/assets/GroceryCategory.webp",
      },
      {
        name: "Fashion",
        value: "clothing",
        imgSrc: "/assets/FashionCategory.webp",
      },
      {
        name: "Jewellery",
        value: "jewellery",
        imgSrc: "/assets/JewelleryCategory.webp",
      },
      {
        name: "Appliance",
        value: "appliance",
        imgSrc: "/assets/ApplianceCategory.webp",
      },
      {
        name: "Mobile",
        value: "Mobiles",
        imgSrc: "/assets/MobileCategory.webp",
      },
      {
        name: "Laptop",
        value: "laptops",
        imgSrc: "/assets/LaptopCategory.webp",
      },
    ],
    []
  );

  const filterByCategory = useCallback(
    (cat) => {
      setfilteredData(
        products.filter(
          (data) => data.category.toLowerCase() === cat.toLowerCase()
        )
      );
    },
    [products, setfilteredData]
  );

  if (location.pathname !== "/") return null;

  const scrollToCategory = () => {
    if (categorySectionRef.current) {
      categorySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <section className="category-section">
      <h1 className="section-title">Shop by Category</h1>
      <div className="category-grid" ref={categorySectionRef} onClick={scrollToCategory} >
        {categories.map(({ name, value, imgSrc }) => (
          <div
            key={value}
            className="category-item"
            onClick={() => navigate(`/?category=${value}`)}
          >
            <img
              src={imgSrc}
              alt={name}
              className="category-img"
              loading="lazy"
            />
            <p>{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
