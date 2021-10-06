import { doc, getDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.scss";
import db from "utils/db";

ProfilePage.propTypes = {};

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchProduct = async (user) => {
      if (Object.keys(user).length === 0) return;

      const products = [];

      for (let productId of user.products) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        products.push(productSnapshot.data());
      }

      setProducts(products);
    };

    fetchProduct(user);
  }, [user]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile user={user} productsOfUser={products} />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
