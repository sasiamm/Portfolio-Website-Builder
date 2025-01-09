// Import and configure Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getFirestore, doc, setDoc, increment } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

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

document.getElementById('create-repo').addEventListener('click', async function() {
    const userName = 'Design-1'; // Replace with dynamic user input if needed
    const userDocRef = doc(db, "Host-List", userName); // Use the `doc` function to reference the document

    // Set the document with incremented count
    await setDoc(userDocRef, {
        name: userName,
        count: increment(1) // Increment count by 1
    }, { merge: true }); // Merge to update the count without overwriting other fields

    console.log(`User  ${userName} count updated in Firebase.`);
});