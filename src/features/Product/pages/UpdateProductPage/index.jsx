import { doc, getDoc, updateDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import AddProductForm from "features/Product/components/AddProductForm";
import { updateProduct } from "features/Product/productsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { converFileListToArray } from "utils/common";
import db from "utils/db";
import { uploadImagesToStorage } from "utils/storage";
import "./UpdateProductPage.scss";

UpdateProductPage.propTypes = {};

function UpdateProductPage(props) {
  const match = useRouteMatch();
  const productId = match.params.id;
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      const productSnapshot = await getDoc(doc(db, `products/${productId}`));
      setProduct(productSnapshot.data());
    };

    fetchProduct();
  }, [productId]);

  const onSubmit = async (data) => {
    const changedValue = {};

    for (let key in data) {
      switch (key) {
        case "image":
          if (data[key].length) {
            changedValue[key] = data[key];
          }
          break;

        case "type":
          if (product.type !== data.type.value)
            changedValue[key] = data[key].value;
          break;
        default:
          if (product[key] !== data[key]) changedValue[key] = data[key];
          break;
      }
    }

    if (changedValue.image) {
      console.log("x");
      const images = converFileListToArray(data.image);
      const imagesUrl = await uploadImagesToStorage(
        images,
        product.userId,
        productId
      );
      changedValue["image"] = imagesUrl;
    }

    console.log("Change value: ", changedValue);
    dispatch(updateProduct(changedValue));
    await updateDoc(doc(db, `products/${productId}`), changedValue);
    history.push("/profile");
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="update-product-section">
        <AddProductForm onSubmit={onSubmit} product={product} />
      </section>

      <Footer />
    </div>
  );
}

export default UpdateProductPage;
