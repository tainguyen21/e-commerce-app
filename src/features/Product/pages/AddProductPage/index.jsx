import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Footer from "components/Footer";
import AddProductForm from "features/Product/components/AddProductForm";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { converFileListToArray } from "utils/common";
import db from "utils/db";
import "./AddProductPage.scss";
import storage from "utils/storage";

AddProductPage.propTypes = {};

function AddProductPage(props) {
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (data) => {
    try {
      const image = converFileListToArray(data.image);

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

      const imagesUrl = [];

      for (let i = 0; i < image.length; i++) {
        const fileRef = ref(storage, `products/${userId}/${docId}/${i}`);
        await uploadBytes(fileRef, image[i]);
        const downloadUrl = await getDownloadURL(fileRef);
        imagesUrl.push(downloadUrl);
      }

      await updateDoc(docRef, {
        image: imagesUrl,
      });

      history.push("/profile");
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
