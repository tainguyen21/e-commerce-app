import { doc, getDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.scss";
import db from "utils/db";
import { Redirect } from "react-router";

ProfilePage.propTypes = {};

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [productsSaving, setProductsSaving] = useState([]);

  useEffect(() => {
    const fetchProductPosting = async () => {
      if (Object.keys(user).length === 0) return;

      const products = [];

      for (let productId of user.products) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        products.push(productSnapshot.data());
      }

      setProducts(products);
    };

    fetchProductPosting();
  }, [user]);

  useEffect(() => {
    const fetchProductSaving = async () => {
      if (Object.keys(user).length === 0) return;

      const productsSaving = [];

      for (let productId of user.saving) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        productsSaving.push(productSnapshot.data());
      }

      setProductsSaving(productsSaving);
    };

    fetchProductSaving();
  }, [user]);

  if (Object.keys(user).length === 0) return <Redirect to="" />;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile
          user={user}
          productsOfUser={products}
          productsSaving={productsSaving}
        />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
