import { db } from "../../utils/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const fetchSingleArray = async (dataLocation, documentName) => {
  try {
    const docRef = doc(db, dataLocation, documentName);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      //console.log("Document data:", data.frames); // Add this line for debugging
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

export { fetchSingleArray, fetchAllFromSingleStore, fetchAllForUser };
