import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { createDocument, getCollection } from "./dbHandler"; // Ensure you import the necessary methods

export const handleUserSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const users = await getCollection('users'); 

    const existingUser = users.find((item) => item.google_uid === user.uid);

    if (!existingUser) {
      const newUser = {
        email: user.email,
        display_name: user.displayName,
        default_name: user.displayName,
        provider: user.providerId,
        image: user.photoURL,
        phone: user.phoneNumber || null,
      };

      await createDocument("users", user.uid, newUser);
      console.log('User created successfully:', newUser);
    } else {
      console.log('User already exists:', existingUser);
    }

  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

export const handleUsersSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
