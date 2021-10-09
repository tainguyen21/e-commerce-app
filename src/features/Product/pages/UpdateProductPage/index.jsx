import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router";
import { doc, getDoc } from "@firebase/firestore";
import db from "utils/db";
import "./UpdateProductPage.scss";
import Footer from "components/Footer";
import AddProductForm from "features/Product/components/AddProductForm";

UpdateProductPage.propTypes = {};

function UpdateProductPage(props) {
  const match = useRouteMatch();
  const productId = match.params.id;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const productSnapshot = await getDoc(doc(db, `products/${productId}`));
      setProduct(productSnapshot.data());
    };

    fetchProduct();
  }, [productId]);

  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="update-product-section">
        <AddProductForm onSubmit={onSubmit} product={product} />
      </section>

      <Footer />
    </div>
  );
}

export default UpdateProductPage;
