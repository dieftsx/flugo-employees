import {initializeApp} from "firebase/app"
import { getAuth, signInAnonymously} from "firebase/auth"
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


// Authenticate anonymously
//
export const authenticateAnonymously = async () = {
  try {
    await signInAnonymously(auth)
    console.log("Authenticated anonymously")
  } catch(error) {
    console.error("Anonymous authentication failed", error)
  }
}

// Employee service

export const employeeService = {
  addEmployee: async (employeeData: Employee) => {
    try {
      const docRef = await addDoc(collection(db, "employees"), {
        ...employeeData,
        status: "Ativo",
        createdAt: new Date()
      })
      return docRef.id;
    } catch (error) {
      console.error("Error adding employee:", error)
      throw error;
    }
  },
  getEmployees: async () => {
    // Implementar conforme necessário
  }
}

export interface Employee {
  name: string;
  email: string;
  departament: string;
  status?: string;
  createdAt?: Date;
}
