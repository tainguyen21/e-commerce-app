import Footer from "components/Footer";
import AddProductForm from "features/Product/components/AddProductForm";
import React from "react";
import "./AddProductPage.scss";

AddProductPage.propTypes = {};

function AddProductPage(props) {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="add-product-section">
        <AddProductForm />
      </section>

      <Footer />
    </div>
  );
}

export default AddProductPage;
