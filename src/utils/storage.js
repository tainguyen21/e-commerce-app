import { app } from "utils/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc } from "@firebase/firestore";
import db from "./db";

const storage = getStorage(app);

export default storage;

export const uploadImagesToStorage = async (images, userId, docId) => {
  const imagesUrl = [];

  for (let i = 0; i < images.length; i++) {
    const fileRef = ref(storage, `products/${userId}/${docId}/${i}`);
    await uploadBytes(fileRef, images[i]);
    const downloadUrl = await getDownloadURL(fileRef);
    imagesUrl.push(downloadUrl);
  }

  return imagesUrl;
};

export const deleteImagesOfProduct = async (userId, productId) => {
  const productSnapshot = await getDoc(doc(db, `products/${productId}`));
  const numberImages = productSnapshot.data().image.length;
  for (let i = 0; i < numberImages; i++) {
    await deleteObject(ref(storage, `products/${userId}/${productId}/${i}`));
  }
};
