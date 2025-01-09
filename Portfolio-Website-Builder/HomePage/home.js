import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signOut , onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

window.onload = async function() {
    const firebaseConfig = {
        apiKey: "AIzaSyAXOpxM81BD8jXsjUv4hzXkIUOAysTZMyo",
        authDomain: "portbuilder-4f719.firebaseapp.com",
        projectId: "portbuilder-4f719",
        storageBucket: "portbuilder-4f719.appspot.com",
        messagingSenderId: "761086433060",
        appId: "1:761086433060:web:9757e662051e553d2805b1"
    };

    // ----------------------------------------------------------------------------
    //                                Initialize Firebase
    // ----------------------------------------------------------------------------
    

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
    const db1 = getDatabase();

    // ----------------------------------------------------------------------------
    //                   Count the Total portfolio from firebase
    // ----------------------------------------------------------------------------



    const portfolioItems = document.querySelectorAll('.container.portfolio');
    const portfolioLength = portfolioItems.length;

    console.log("Current Portfolio Length:", portfolioLength);

    // Reference to the document where we store the portfolio length
    const docRef = doc(db, "portfolioLengths", "currentLength");

    // Fetch existing count from Firestore
    const docSnap = await getDocs(collection(db, "portfolioLengths"));

    if (docSnap.empty) {
        // If no document exists, create one
        await setDoc(docRef, {
            length: portfolioLength,
            timestamp: new Date()
        });
        console.log("Document created with ID: ", docRef.id);
    } else {
        // If document exists, check the current length
        const existingData = docSnap.docs[0].data();
        const existingLength = existingData.length;

        // Compare and update if different
        if (existingLength !== portfolioLength) {
            await setDoc(docRef, {
                length: portfolioLength,
                timestamp: new Date()
            });
            console.log("Document updated with new length: ", portfolioLength);
        } else {
            console.log("No update needed, length is the same.");
        }
    }




    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log("User  is signed in:", user);
            const userId = user.uid; // Get the user's unique ID
            console.log(userId);
    
            // Retrieve the user's display name
            const userName = user.email || "Error"; // Fallback if displayName is not set
    
            // Update the UI with the user's name
            document.getElementById('userName').innerText = ` ${userName}`;
    
            const userData = {
                createdAt: new Date().toISOString(),
                email: user.email,
                name: user.displayName, // Use the retrieved display name
                role: "User " // Replace with actual role if available
            };
    
            // Save user data to Firebase Realtime Database
            set(ref(db1, 'users/' + userId), userData)
                .then(() => {
                    console.log("User  data saved successfully.");
                })
                .catch((error) => {
                    console.error("Error saving user data: ", error);
                });
        } else {
            // User is signed out
            console.log("No user is signed in.");
            document.getElementById('userName').innerText = "Guest!";
        }
    });




    // ----------------------------------------------------------------------------
    //                                Log Out
    // ----------------------------------------------------------------------------

    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            alert('Logged out successfully!');
            window.location.href = '/Portfolio-Website-Builder/LoginPage/index.html';
        } catch (error) {
            console.error("Error logging out:", error);
        }
    });


};