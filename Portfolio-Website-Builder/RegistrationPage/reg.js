



// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app); // Firestore database instance

const registrationForm = document.getElementById('registrationForm');
const errorMessage = document.getElementById('errorMessage');

// Handle form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        // Register user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);
        alert('Verification email sent! Please check your inbox.');

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            password: password,
            role: role,
            createdAt: new Date().toISOString()
        });

        // Redirect to login page
        window.location.href = "/Portfolio-Website-Builder/LoginPage/index.html";
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
