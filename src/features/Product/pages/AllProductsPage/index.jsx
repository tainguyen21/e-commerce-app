import Banner from "components/Banner";
import Footer from "components/Footer";
import ProductList from "features/Product/components/ProductList";
import React, { useEffect, useRef, useState } from "react";
import { Container, Spinner } from "reactstrap";
import "./AllProductsPage.scss";
import { options } from "constants/product";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import db from "utils/db";

AllProductsPage.propTypes = {};

function AllProductsPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [, setAllProductsTemp] = useState([]);
  const [typeTemp, setTypeTemp] = useState("all");
  const type = useRef("all");
  const allProducts = useRef([]);
  const hasProduct = useRef(true);
  const lastProduct = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const optionTypes = [
    {
      label: "All",
      value: "all",
    },
    ...options,
  ];

  const fetchMoreProduct = async () => {
    if (!hasProduct.current) return;

    setIsLoading(true);

    const products = [];

    if (type === "all") {
      const q = query(
        collection(db, "products"),
        startAfter(lastProduct.current),
        limit(9)
      );
      const productsSnapshot = await getDocs(q);

      if (productsSnapshot.docs.length === 0) {
        hasProduct.current = false;
        return;
      }

      productsSnapshot.forEach((product) =>
        products.push({
          ...product.data(),
          id: product.id,
        })
      );

      lastProduct.current =
        productsSnapshot.docs[productsSnapshot.docs.length - 1];
    } else {
      const q = query(
        collection(db, "products"),
        where("type", "==", type),
        startAfter(lastProduct.current),
        limit(9)
      );
      const productsSnapshot = await getDocs(q);

      if (productsSnapshot.docs.length === 0) {
        hasProduct.current = false;
        return;
      }

      productsSnapshot.forEach((product) =>
        products.push({
          ...product.data(),
          id: product.id,
        })
      );

      lastProduct.current =
        productsSnapshot.docs[productsSnapshot.docs.length - 1];
    }

    allProducts.current = [...allProducts.current, ...products];
    setIsLoading(false);
    setAllProductsTemp(products);
  };

  useEffect(() => {
    hasProduct.current = true;
    const fetchProduct = async () => {
      const products = [];
      setIsLoading(true);

      if (type.current === "all") {
        const q = query(collection(db, "products"), limit(9));
        const productsSnapshot = await getDocs(q);

        productsSnapshot.forEach((product) =>
          products.push({
            ...product.data(),
            id: product.id,
          })
        );

        lastProduct.current =
          productsSnapshot.docs[productsSnapshot.docs.length - 1];
      } else {
        const q = query(
          collection(db, "products"),
          where("type", "==", type.current),
          limit(9)
        );
        const productsSnapshot = await getDocs(q);

        productsSnapshot.forEach((product) =>
          products.push({
            ...product.data(),
            id: product.id,
          })
        );

        lastProduct.current =
          productsSnapshot.docs[productsSnapshot.docs.length - 1];
      }

      allProducts.current = products;
      setIsLoading(false);
      setAllProductsTemp(products);
    };
    fetchProduct();
  }, [typeTemp]);

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
                  type.current === item.value && "active"
                }`}
                key={index}
                onClick={() => {
                  type.current = item.value;
                  setTypeTemp(item.value);
                }}
              >
                {item.label}
              </li>
            ))}
          </div>
        </Container>
        <Container>
          <ProductList
            products={allProducts.current}
            fetchMoreProduct={fetchMoreProduct}
          />
          <div
            className="products-loading"
            style={isLoading ? { display: "flex" } : { display: "none" }}
          >
            <Spinner /> <span>Loading</span>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

export default AllProductsPage;
