import { db } from "../../utils/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
const fetchImageUrl = async (imagePath) => {
  const storage = getStorage();
  const imageRef = ref(storage, imagePath);

  try {
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
const fetchAllImages = async (folderPath) => {
  const storage = getStorage();
  
  const folderRef = ref(storage, folderPath);
  console.log( "folderRef",folderRef)
 
    const res = await listAll(folderRef);
    console.log('listAll result:', res); // Log the result

    const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
    return urls;
  
};
const fetchFromStorage = async (filePath) => {
  try {
    // Get a reference to the storage service
    const storage = getStorage();

    // Create a storage reference from our storage service
    const fileRef = ref(storage, filePath);

    // Get the download URL
    const url = await getDownloadURL(fileRef);
    console.log("URL:", url);
    // `url` is the download URL for your file
    return url;
  } catch (error) {
    console.error("Error fetching data from storage:", error);
    throw error;
  }
};

const fetchSingleArray = async (dataLocation, documentName) => {
  try {
    const docRef = doc(db, dataLocation, documentName);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
     
      const framesArray = data.frames;
      return framesArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchAllFromSingleStore = async (dataLocation) => {
  try {
    const collectionRef = collection(db, dataLocation);
    const querySnapshot = await getDocs(collectionRef);

    const results = [];

    for (const document of querySnapshot.docs) {
      const documentName = document.id; // Assuming document name is the document ID
      const framesData = await fetchSingleArray(dataLocation, documentName);

      results.push({
        documentName,
        framesData,
      });
    }
    // You can log the results for debugging purposes
    //console.log('Results:', results);
    return results;
  } catch (error) {
    console.error("Error fetching data by time period:", error);
    throw error;
  }
};

const fetchAllForUser = async (storesLocation) => {
  try {
    const userCollectionRef = collection(db, storesLocation);
    const userQuerySnapshot = await getDocs(userCollectionRef);

    const allUserData = [];

    for (const userDocument of userQuerySnapshot.docs) {
      const userDataLocation = storesLocation + "/" + userDocument.id + "/data"; // Assuming user document name is the data location
      const userFramesData = await fetchAllFromSingleStore(userDataLocation);
        
      allUserData.push({
        storeId: userDocument.id,
        userDataLocation,
        userFramesData,
      });
    }
    console.log(allUserData)
    return allUserData;
  } catch (error) {
    console.error("Error fetching data for user:", error);
    throw error;
  }
};
const fetchUserStores = async (userId) => {
  try {
    const storesLocation = `users/${userId}/stores`;
    const storesCollectionRef = collection(db, storesLocation);
    const storesQuerySnapshot = await getDocs(storesCollectionRef);

    const stores = [];

    for (const storeDocument of storesQuerySnapshot.docs) {
      stores.push({
        storeId: storeDocument.id,
        storeName: storeDocument.data().storeName, // Assuming the store name is stored in a field named "name"
      });
    }
    //console.log(stores);
    return stores;
  } catch (error) {
    console.error("Error fetching stores for user:", error);
    throw error;
  }
};

export {fetchAllImages,fetchImageUrl,fetchFromStorage, fetchSingleArray, fetchAllFromSingleStore, fetchAllForUser, fetchUserStores };
