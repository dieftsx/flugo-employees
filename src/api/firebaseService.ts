import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEzhrvCPjNNEmp1kSd4P7u2l8XUUDNMH8",
  authDomain: "flugo-employees.firebaseapp.com",
  projectId: "flugo-employees",
  storageBucket: "flugo-employees.firebasestorage.app",
  messagingSenderId: "336318601807",
  appId: "1:336318601807:web:163014d8ecfea554c3283a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Firebase Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

// Firestore functions for employees
const docToEmployee = (doc: QueryDocumentSnapshot<DocumentData>): Employee => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    departament: data.departament,
    gender: data.gender || 'male',
    status: data.status || 'Ativo',
    createdAt: data.createdAt?.toDate() || new Date(),
    userId: data.userId
  };
};

export const employeeService = {
  addEmployee: async (employeeData: Omit<Employee, 'id'>, userId: string): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, "employees"), {
        ...employeeData,
        userId,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding employee: ", error);
      throw error;
    }
  },
  
  getEmployees: async (userId: string): Promise<Employee[]> => {
    try {
      const q = query(collection(db, "employees"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(docToEmployee);
    } catch (error) {
      console.error("Error getting employees: ", error);
      return [];
    }
  }
};

export interface Employee {
  id?: string;
  name: string;
  email: string;
  departament: string;
  gender: string,
  status: string;
  createdAt?: Date;
  userId?: string;
}
