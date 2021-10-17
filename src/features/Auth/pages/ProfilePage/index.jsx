import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect, useRef, useState } from "react";
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
  const [isFetchingPosting, setIsFetchingPosting] = useState(false);
  const [isFetchingSaving, setIsFetchingSaving] = useState(false);

  const dispatch = useDispatch();

  const productPostingFetched = useRef(0);
  const productSavingFetched = useRef(0);
  const productsRef = useRef([]);
  const productsSavingRef = useRef([]);
  const isFetchingMorePosting = useRef(false);
  const isFetchingMoreSaving = useRef(false);

  const fetchMoreProductPosting = async () => {
    if (isFetchingMorePosting.current) return;

    isFetchingMorePosting.current = true;
    setIsFetchingPosting(true);
    const productsDB = [];

    for (let i = 0; i < 5; i++) {
      if (productPostingFetched.current === user.products.length) {
        return;
      }
      const productSnapshot = await getDoc(
        doc(db, `products/${user.products[productPostingFetched.current]}`)
      );
      productsDB.push(productSnapshot.data());
      productPostingFetched.current++;
    }

    productsRef.current = [...productsRef.current, ...productsDB];
    setProducts(productsRef.current);
    isFetchingMorePosting.current = false;
    setIsFetchingPosting(false);
  };

  const fetchMoreProductSaving = async () => {
    if (isFetchingMoreSaving.current) return;

    isFetchingMoreSaving.current = true;
    setIsFetchingSaving(true);

    const productsSaving = [];

    for (let i = 0; i < 5; i++) {
      const productSnapshot = await getDoc(
        doc(db, `products/${user.saving[productSavingFetched.current]}`)
      );
      if (!productSnapshot.data()) {
        await updateDoc(doc(db, `users/${user.id}`), {
          saving: arrayRemove(user.saving[productSavingFetched.current]),
        });
      } else {
        productsSaving.push(productSnapshot.data());
      }
      productSavingFetched.current++;
    }

    productsSavingRef.current = [
      ...productsSavingRef.current,
      ...productsSaving,
    ];
    isFetchingMoreSaving.current = false;
    setIsFetchingSaving(false);
    setProductsSaving(productsSavingRef.current);
  };

  useEffect(() => {
    const fetchProductPosting = async () => {
      if (Object.keys(user).length === 0) return;
      isFetchingMorePosting.current = true;
      setIsFetchingPosting(true);

      const productsDB = [];

      for (let i = 0; i < 5; i++) {
        if (productPostingFetched.current === user.products.length) {
          isFetchingMorePosting.current = false;
          setIsFetchingPosting(false);
          return;
        }
        const productSnapshot = await getDoc(
          doc(db, `products/${user.products[productPostingFetched.current]}`)
        );
        productsDB.push(productSnapshot.data());
        productPostingFetched.current++;
      }

      productsRef.current = productsDB;
      isFetchingMorePosting.current = false;
      setIsFetchingPosting(false);
      setProducts(productsDB);
    };

    fetchProductPosting();
  }, [user]);

  useEffect(() => {
    const fetchProductSaving = async () => {
      if (Object.keys(user).length === 0 || isFetchingMoreSaving.current)
        return;

      isFetchingMoreSaving.current = true;
      setIsFetchingSaving(true);

      const productsSaving = [];

      for (let i = 0; i < 5; i++) {
        if (productSavingFetched.current === user.saving.length) {
          isFetchingMoreSaving.current = false;
          setIsFetchingSaving(false);
          return;
        }
        const productSnapshot = await getDoc(
          doc(db, `products/${user.saving[productSavingFetched.current]}`)
        );
        if (!productSnapshot.data()) {
          await updateDoc(doc(db, `users/${user.id}`), {
            saving: arrayRemove(user.saving[productSavingFetched.current]),
          });
        } else {
          productsSaving.push(productSnapshot.data());
        }
        productSavingFetched.current++;
      }

      productsSavingRef.current = productsSaving;
      isFetchingMoreSaving.current = false;
      setIsFetchingSaving(false);
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

  if (Object.keys(user).length === 0) return <Redirect to="/" />;

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile
          user={user}
          productsOfUser={products}
          productsSaving={productsSaving}
          onDeleteClick={handleDeleteClick}
          fetchMoreProductPosting={fetchMoreProductPosting}
          fetchMoreProductSaving={fetchMoreProductSaving}
          isFetchingMorePosting={isFetchingPosting}
          isFetchingMoreSaving={isFetchingSaving}
        />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
