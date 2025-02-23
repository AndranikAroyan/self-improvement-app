import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";

// Save a journal entry
export const saveJournal = async (journal) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const journalWithDate = { ...journal, date: new Date().toISOString() };
    await addDoc(collection(db, "users", user.uid, "journals"), journalWithDate);
  } catch (error) {
    throw error;
  }
};

// Fetch all journals for the user
export const getJournals = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const querySnapshot = await getDocs(collection(db, "users", user.uid, "journals"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
