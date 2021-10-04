import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "@firebase/firestore";
import Footer from "components/Footer";
import AddProductForm from "features/Product/components/AddProductForm";
import React from "react";
import { useSelector } from "react-redux";
import "./AddProductPage.scss";
import db from "utils/db";
import { useHistory } from "react-router";

AddProductPage.propTypes = {};

function AddProductPage(props) {
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  const handleSubmit = async (data) => {
    const image = [];
    for (let i = 0; i < data.image.length; i++) {
      image.push(data.image[i]);
    }

    const productData = {
      ...data,
      type: data.type.value,
      userId: userId,
      image,
    };

    try {
      // const docRef = await addDoc(collection(db, "products"), productData);
      // const docId = docRef.id;
      // const userRef = await doc(db, `users/${userId}`);

      // await updateDoc(userRef, {
      //   products: arrayUnion(docId),
      // });

      // history.push("/profile");

      console.log(productData);
    } catch (error) {
      console.log(error);
    }
  };

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
