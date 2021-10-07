import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import { addSavingPost } from "features/Auth/userSlice";
import ProductDetail from "features/Product/components/ProductDetail";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import db from "utils/db";

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  const match = useRouteMatch();
  const currentUser = useSelector((state) => state.user);
  const id = match.params.id;
  const product = useSelector((state) => {
    return state.products.find((product) => product.id === id);
  });
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleSavePostClick = async () => {
    if (Object.keys(currentUser).length) {
      if (currentUser.id === product.userId) {
        alert("Can't save your post");
        return;
      }

      dispatch(addSavingPost(id));
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        saving: arrayUnion(id),
      });

      alert("Save success");
    } else {
      alert("You must login");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async (product) => {
      if (!product) return;

      const userSnapshot = await getDoc(doc(db, `users/${product.userId}`));

      setUser(userSnapshot.data());
    };

    fetchUserInfo(product);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="product-detail-section">
        <ProductDetail
          product={product}
          user={user}
          onSavePostClick={handleSavePostClick}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
