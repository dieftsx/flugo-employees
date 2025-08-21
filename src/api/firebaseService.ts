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
  QueryDocumentSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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
  getEmployeeById: async (id: string): Promise<Employee> => {
    try {
      const docRef = doc(db, "employees", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          email: data.email,
          departament: data.department,
          gender: data.gender || 'male',
          status: data.status || 'Ativo',
          createdAt: data.createdAt?.toDate(),
          userId: data.userId
        };
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error getting employee: ", error);
      throw error;
    }
  },

  updateEmployee: async (id: string, employeeData:Partial<Employee>): Promise<void> => {
    try {
      const docRef = doc(db, "employees", id)
      await updateDoc(docRef, employeeData)
    } catch (error) {
      console.error('Error updating employee', error)
      throw error
    }
  },

  deleteEmployee: async (id: string):Promise<void> => {
    try {
      if (!id) {
        throw new Error ("ID do colaborador é necessário pra exclusão")
      }
      console.log("Deletando colaborador com ID:", id)
      const docRef = doc(db, "employees", id)
      await deleteDoc(docRef)
      console.log("Colaborador deletado com sucesso")
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
      if (error instanceof Error) {
        throw new Error(`Falha ao excluir colaborador: ${error.message}`);
      } else {
        throw new Error("Falha ao excluir colaborador: erro desconhecido");
      }
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
