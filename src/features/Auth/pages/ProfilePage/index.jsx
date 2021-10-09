import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.scss";
import db from "utils/db";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { removeProduct } from "features/Product/productsSlice";
import { removeProductOfUser } from "features/Auth/userSlice";
import { deleteImagesOfProduct } from "utils/storage";

ProfilePage.propTypes = {};

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [productsSaving, setProductsSaving] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductPosting = async () => {
      if (Object.keys(user).length === 0) return;

      const productsDB = [];

      for (let productId of user.products) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        productsDB.push(productSnapshot.data());
      }

      setProducts(productsDB);
    };

    fetchProductPosting();
  }, [user]);

  useEffect(() => {
    const fetchProductSaving = async () => {
      if (Object.keys(user).length === 0) return;

      const productsSaving = [];

      for (let productId of user.saving) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        if (!productSnapshot.data()) {
          await updateDoc(doc(db, `users/${user.id}`), {
            saving: arrayRemove(productId),
          });
        } else {
          productsSaving.push(productSnapshot.data());
        }
      }

      setProductsSaving(productsSaving);
    };

    fetchProductSaving();
  }, [user]);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      dispatch(removeProduct(id));
      dispatch(removeProductOfUser(id));
      await deleteImagesOfProduct(user.id, id);
      await deleteDoc(doc(db, `products/${id}`));
      await updateDoc(doc(db, `users/${user.id}`), {
        products: arrayRemove(id),
      });
    }
  };

  console.log(productsSaving);

  if (Object.keys(user).length === 0) return <Redirect to="/" />;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile
          user={user}
          productsOfUser={products}
          productsSaving={productsSaving}
          onDeleteClick={handleDeleteClick}
        />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
