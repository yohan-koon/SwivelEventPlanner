import { addDoc, collection, getDoc, doc, query, where, getDocs, updateDoc, setDoc } from "@firebase/firestore";
import { db } from "../../config/firebase.config";
import { firestoreTables } from "../../constants";
import { User } from "../../redux/user";

/**
 * Save user inside firestore
 */
export const saveUser = async (user: User): Promise<User> => {
    try {
        //Add user to firestore
        const userRef = await addDoc(collection(db, firestoreTables.USERS), user);
        //Get user snap
        return getUser(user.id);
    }catch (error) {
        throw error;
    }
}

/**
 * Update user inside firestore
 */
export const saveOrUpdateUser = async (user: User): Promise<User> => {
    try {
        if(!user.id) throw new Error('User id is required');
        //Update user in firestore
        const userRef = doc(db, firestoreTables.USERS, user.id);
        await setDoc(userRef, user);
        return user;
    }catch (error) {
        throw error;
    }
}

/**
 * Get user from firestore
 */
export const getUser = async (userId: string): Promise<User> => {
    try {
        //Get user reference
        const usersRef = collection(db, firestoreTables.USERS);
        //Get user data
        const q = query(usersRef, where('id', '==', userId));
        const userSnap = await getDocs(q);
        if(userSnap.empty) throw new Error('User not found');
        const user = userSnap.docs[0].data() as User;
        return user;
    }catch (error) {
        throw error;
    }
}