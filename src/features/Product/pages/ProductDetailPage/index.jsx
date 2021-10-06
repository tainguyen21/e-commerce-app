import { doc, getDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import ProductDetail from "features/Product/components/ProductDetail";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import db from "utils/db";

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  const match = useRouteMatch();
  const id = match.params.id;
  const product = useSelector((state) => {
    return state.products.find((product) => product.id === id);
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async (product) => {
      if (!product) return;

      const userSnapshot = await getDoc(doc(db, `users/${product.userId}`));

      setUser(userSnapshot.data());
    };

    fetchUserInfo(product);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="product-detail-section">
        <ProductDetail product={product} user={user} />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
