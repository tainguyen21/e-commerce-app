import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import { addSavingPost, removeSavingPost } from "features/Auth/userSlice";
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
  const hasSaved =
    Object.keys(currentUser).length !== 0
      ? currentUser.saving.indexOf(id) !== -1
      : false;

  const handleSavePostClick = async () => {
    if (hasSaved) {
      dispatch(removeSavingPost(id));

      await updateDoc(doc(db, `users/${currentUser.id}`), {
        saving: arrayRemove(id),
      });
      return;
    }

    if (Object.keys(currentUser).length) {
      if (currentUser.id === product.userId) {
        alert("Can't save your post");
        return;
      }

      dispatch(addSavingPost(id));
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        saving: arrayUnion(id),
      });
    } else {
      alert("You must login");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!product) return;

      const userSnapshot = await getDoc(doc(db, `users/${product.userId}`));

      setUser(userSnapshot.data());
    };

    fetchUserInfo();
  }, [id, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  console.log(hasSaved);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="product-detail-section">
        <ProductDetail
          product={product}
          user={user}
          onSavePostClick={handleSavePostClick}
          hasSaved={hasSaved}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
