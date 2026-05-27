import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LeadFormData } from "@/types";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Saves a new lead form submission into the "leads" Firestore collection.
 */
export async function saveLeadToFirestore(leadData: LeadFormData) {
  try {
    const leadsCollection = collection(db, "leads");
    const docRef = await addDoc(leadsCollection, {
      ...leadData,
      createdAt: serverTimestamp(),
    });
    console.log("Lead guardado exitosamente en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al guardar lead en Firestore:", error);
    throw error;
  }
}
