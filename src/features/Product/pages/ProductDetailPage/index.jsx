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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import db from "utils/db";

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  const match = useRouteMatch();
  const currentUser = useSelector((state) => state.user);
  const id = match.params.id;
  const [product, setProduct] = useState({ image: [] });
  const [user, setUser] = useState({});
  const userIdRef = useRef(null);
  const dispatch = useDispatch();
  const hasSaved =
    Object.keys(currentUser).length !== 0
      ? currentUser.saving.indexOf(id) !== -1
      : false;

  const handleSavePostClick = async () => {
    if (Object.keys(currentUser).length) {
      if (currentUser.id === userIdRef.current) {
        alert("Can't save your post");
        return;
      }

      if (hasSaved) {
        dispatch(removeSavingPost(id));

        await updateDoc(doc(db, `users/${currentUser.id}`), {
          saving: arrayRemove(id),
        });
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
    const fetchProduct = async () => {
      const productSnapshot = await getDoc(doc(db, `products/${id}`));

      const userSnapshot = await getDoc(
        doc(db, `users/${productSnapshot.data().userId}`)
      );

      userIdRef.current = productSnapshot.data().userId;
      setProduct(productSnapshot.data());
      setUser(userSnapshot.data());
    };

    fetchProduct();
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
          hasSaved={hasSaved}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
