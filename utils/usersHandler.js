import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { createDocument, getCollection } from "./dbHandler"; // Ensure you import the necessary methods

// Signup Function
export const handleUserSignUp = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const users = await getCollection("users");
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
      console.log("User signed up successfully:", newUser);
      return { status: "success", message: "User signed up successfully." };
    } else {
      console.log("User already exists:", existingUser);
      return { status: "exists", message: "User already exists." };
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return { status: "error", message: error.message };
  }
};

// Login Function
export const handleUserLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("User logged in successfully:", user);
    return { status: "success", message: "User logged in successfully.", user };
  } catch (error) {
    console.error("Error logging in:", error);
    return { status: "error", message: error.message };
  }
};

// Sign Out Function
export const handleUserSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    return { status: "success", message: "User signed out successfully." };
  } catch (error) {
    console.error("Error signing out:", error);
    return { status: "error", message: error.message };
  }
};
