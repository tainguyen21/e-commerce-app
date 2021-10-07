import { doc, getDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router";
import db from "utils/db";

UserPage.propTypes = {};

function UserPage() {
  const [user, setUser] = useState({});
  const match = useRouteMatch();
  const userId = match.params.id;
  const [products, setProducts] = useState([]);
  const [productsSaving, setProductsSaving] = useState([]);
  const productsIdOfUser = useMemo(() => [], [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userSnapshot = await getDoc(doc(db, `users/${userId}`));
      setUser(userSnapshot.data());
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const fetchProductPosting = async () => {
      if (Object.keys(user).length === 0) return;

      const products = [];

      for (let productId of user.products) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        productsIdOfUser.push(productId);
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

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile
          user={user}
          productsOfUser={products}
          productsSaving={productsSaving}
          otherUser={true}
          productsIdOfUser={productsIdOfUser}
        />
      </section>
      <Footer />
    </div>
  );
}

export default UserPage;
