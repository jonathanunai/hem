import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCX4NhtDfTNgOFb22HD1AeJto-e43LvFLE",
  authDomain: "hem-project-325912.firebaseapp.com",
  projectId: "hem-project-325912",
  storageBucket: "hem-project-325912.appspot.com",
  messagingSenderId: "37049723745",
  appId: "1:37049723745:web:88a5715f666d98811b7320",
  measurementId: "G-K9R5TL8H1G"
};
let firebaseApp;
const apps = getApps()
if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = apps[0]
}
const db = getFirestore(firebaseApp, {})
const analytics = getAnalytics(firebaseApp);
export { db,  analytics}
