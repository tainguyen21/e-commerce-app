import { app } from "utils/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
