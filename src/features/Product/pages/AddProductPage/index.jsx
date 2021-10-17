import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import { addUserProduct } from "features/Auth/userSlice";
import AddProductForm from "features/Product/components/AddProductForm";
import { addProduct } from "features/Product/productsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import { getMockData } from "utils/addRandomData";
import { converFileListToArray } from "utils/common";
import db from "utils/db";
import { uploadImagesToStorage } from "utils/storage";
import "./AddProductPage.scss";

AddProductPage.propTypes = {};

function AddProductPage(props) {
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (data) => {
    try {
      const images = converFileListToArray(data.image);

      const productData = {
        ...data,
        type: data.type.value,
        userId: userId,
        image: [],
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      const docId = docRef.id;
      const userRef = doc(db, `users/${userId}`);

      await updateDoc(userRef, {
        products: arrayUnion(docId),
      });

      const imagesUrl = await uploadImagesToStorage(images, userId, docId);

      await updateDoc(docRef, {
        image: imagesUrl,
      });

      //Comment this block to add mock data
      const completeProductData = {
        ...productData,
        image: imagesUrl,
        id: docId,
      };

      dispatch(addProduct(completeProductData));
      dispatch(addUserProduct(docId));

      history.push("/profile");
    } catch (error) {}
  };

  //Script to add mock data
  // useEffect(() => {
  //   const addData = async () => {
  //     const data = await getMockData();

  //     for (let i = 0; i < data.length; i++) {
  //       await handleSubmit(data[i]);
  //     }
  //   };

  //   if (userId) addData();
  // }, [userId]);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="add-product-section">
        <AddProductForm onSubmit={handleSubmit} />
      </section>

      <Footer />
    </div>
  );
}

export default AddProductPage;
