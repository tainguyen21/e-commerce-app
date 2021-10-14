import data from "../mock_data/MOCK_DATA.json";
import axios from "axios";

const imageUrls = [
  "https://images.unsplash.com/photo-1634173760334-7fee63645be5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1634132119568-76492ae0729c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1634176866089-b633f4aec882?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80",
  "https://images.unsplash.com/photo-1634125486933-df0e64f5bbca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1634142312134-3a52dfa989a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1634163332762-f91ad35d7d87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1634161853515-df09fea85f75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
];

export const getMockData = async () => {
  const resultData = [];

  for (let i = 0; i < data.length; i++) {
    const productJSON = data[i];
    const product = {
      address: productJSON.address,
      description: productJSON.description,
      name: productJSON.name,
      price: productJSON.price,
      type: {
        label: productJSON.type,
        value: productJSON.type.toLowerCase(),
      },
    };

    const images = [];
    const numberOfImages = 3 + Math.floor(Math.random() * 6);
    for (let j = 0; j < numberOfImages; j++) {
      const res = await axios.get(
        imageUrls[Math.floor(Math.random() * imageUrls.length)],
        { responseType: "blob" }
      );

      const contentType = res.headers["content-type"];
      const blob = await res.data;

      images.push(
        new File([blob], `${j}`, {
          type: contentType,
        })
      );
    }

    product["image"] = images;

    resultData.push(product);
  }

  return resultData;
};
