import Footer from "components/Footer";
import ProductDetail from "features/Product/components/ProductDetail";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  const match = useRouteMatch();
  const id = match.params.id;
  const product = useSelector((state) => {
    return state.products.find((product) => product.id === id);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="product-detail-section">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
