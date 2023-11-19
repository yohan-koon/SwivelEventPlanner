import { auth } from "../../config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { User } from "../../redux/user";
import { saveOrUpdateUser, saveUser } from "./userService";

/**
 * Create a new user with email and password
 * @param email user email
 * @param password user password
 * @returns the user credentials
 */
export const signUpWithEmailAndPassword = async (email: string, password: string) : Promise<User> => {
    try {
        //Create user with email and password inside firebase auth
        const userCredential =  await createUserWithEmailAndPassword(auth, email, password);

        //create user object inside users collection
        const user = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as User;

        const newUser = saveOrUpdateUser(user);
        if(!newUser) {
            throw new Error('Error saving user');
        }
        return newUser;
    }catch (error) {
        throw error;
    }
}

/**
 * Sign in with email and password
 * @param email user email
 * @param password user password
 * @returns the user credentials
 */
export const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
    }
    catch (error) {
        throw error;
    }
}

/**
 * Sign out
 */
export const logout = async () => {
    try {
        await auth.signOut();
    }catch (error) {
        throw error;
    }
}
