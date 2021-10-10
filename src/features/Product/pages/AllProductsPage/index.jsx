import Banner from "components/Banner";
import Footer from "components/Footer";
import ProductList from "features/Product/components/ProductList";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import "./AllProductsPage.scss";
import { options } from "constants/product";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import db from "utils/db";

AllProductsPage.propTypes = {};

function AllProductsPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [allProducts, setAllProducts] = useState([]);
  const [type, setType] = useState("all");
  const optionTypes = [
    {
      label: "All",
      value: "all",
    },
    ...options,
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      const products = [];

      if (type === "all") {
        const q = query(collection(db, "products"), limit(12));
        const productsSnapshot = await getDocs(q);

        productsSnapshot.forEach((product) =>
          products.push({
            ...product.data(),
            id: product.id,
          })
        );
      } else {
        const q = query(
          collection(db, "products"),
          where("type", "==", type),
          limit(12)
        );
        const productsSnapshot = await getDocs(q);

        productsSnapshot.forEach((product) =>
          products.push({
            ...product.data(),
            id: product.id,
          })
        );
      }

      setAllProducts(products);
    };

    fetchProduct();
  }, [type]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="products-banner">
        <Banner />
      </div>
      <section className="products-section">
        <Container>
          <div className="products-filter">
            {optionTypes.map((item, index) => (
              <li
                className={`products-filter__item ${
                  type === item.value && "active"
                }`}
                key={index}
                onClick={() => setType(item.value)}
              >
                {item.label}
              </li>
            ))}
          </div>
        </Container>
        <ProductList products={allProducts} />
      </section>
      <Footer />
    </div>
  );
}

export default AllProductsPage;
