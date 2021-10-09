import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import { addFollowing, removeFollowing } from "features/Auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import db from "utils/db";

UserPage.propTypes = {};

function UserPage() {
  const [user, setUser] = useState({
    following: [],
    follower: [],
    products: [],
    saving: [],
  });
  const match = useRouteMatch();
  const userId = match.params.id;
  const [products, setProducts] = useState([]);
  const [productsSaving, setProductsSaving] = useState([]);
  const [productsIdOfUser, setProductsIdOfUser] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isFollowing = Object.keys(currentUser).length
    ? currentUser.following.indexOf(userId) !== -1
    : false;
  let [followingTemp, setFollowingTemp] = useState(0);

  const handleFollowClick = async () => {
    if (!Object.keys(currentUser).length) {
      alert("You must login");
      return;
    }

    if (currentUser.id === userId) {
      alert("You can't follow yourself");
      return;
    }

    if (!isFollowing) {
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        following: arrayUnion(userId),
      });

      await updateDoc(doc(db, `users/${userId}`), {
        follower: arrayUnion(currentUser.id),
      });
      setFollowingTemp(1);

      dispatch(addFollowing(userId));
    } else {
      await updateDoc(doc(db, `users/${currentUser.id}`), {
        following: arrayRemove(userId),
      });

      await updateDoc(doc(db, `users/${userId}`), {
        follower: arrayRemove(currentUser.id),
      });

      setFollowingTemp(0);

      dispatch(removeFollowing(userId));
    }
  };

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
      const productsId = [];

      for (let productId of user.products) {
        const productSnapshot = await getDoc(doc(db, `products/${productId}`));
        productsId.push(productId);
        products.push(productSnapshot.data());
      }

      setProducts(products);
      setProductsIdOfUser(productsId);
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
          onFollowClick={handleFollowClick}
          isFollowing={isFollowing}
          followingTemp={followingTemp}
        />
      </section>
      <Footer />
    </div>
  );
}

export default UserPage;
