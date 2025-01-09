
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXOpxM81BD8jXsjUv4hzXkIUOAysTZMyo",
    authDomain: "portbuilder-4f719.firebaseapp.com",
    projectId: "portbuilder-4f719",
    storageBucket: "portbuilder-4f719.appspot.com",
    messagingSenderId: "761086433060",
    appId: "1:761086433060:web:9757e662051e553d2805b1",
    measurementId: "G-ZH75VMXJ52"
};

// ----------------------------------------------------------------------------
//                                Initialize Firebase
// ----------------------------------------------------------------------------


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app); // Firestore instance

const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

// Handle login form submission
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const selectedRole = document.getElementById("role").value;

    try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

    

    // ----------------------------------------------------------------------------
    //                   Check if the email is verified
    // ----------------------------------------------------------------------------

        if (!user.emailVerified) {
            alert("Please verify your email before logging in.");
            await signOut(auth); // Log out the user if email is not verified
            return;
        }

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Check if the role matches the one in Firestore
            if (userData.role === selectedRole) {
                alert(`Login successful as ${selectedRole}!`);
                // Redirect based on role
                if (selectedRole === "Admin") {
                    window.location.href = "/Portfolio-Website-Builder/AdminPanel/admin.html";
                } else {
                    window.location.href = "/Portfolio-Website-Builder/LandingPage/landing.html";
                }
            } else {
                messageDiv.innerHTML = `<p style="color:red;">Error: User doesn't exist!</p>`;
                await signOut(auth); // Log out the user if the role doesn't match
            }
        } else {
            messageDiv.innerHTML = `<p style="color:red;">Error: User data not found in database!</p>`;
            await signOut(auth);
        }
    } catch (error) {
        messageDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});

