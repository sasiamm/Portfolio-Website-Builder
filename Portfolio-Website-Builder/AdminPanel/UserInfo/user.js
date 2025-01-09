

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


window.onload = function() {
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
    const auth = getAuth();
    const db = getFirestore();

    console.log("Firebase initialized:", app);



    // ----------------------------------------------------------------------------
    //                                Get ID from UI
    // ----------------------------------------------------------------------------


    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const roleSelect = document.getElementById('roleSelect');
    const logoutBtn = document.getElementById('logoutBtn');



    // ----------------------------------------------------------------------------
    //                        Fetch All type of Users Information
    // ----------------------------------------------------------------------------



    async function fetchUsers(roleFilter = 'all') {
        console.log("Fetching users from Firestore...");
        try {
            const snapshot = await getDocs(collection(db, 'users'));
            userTableBody.innerHTML = ''; // Clear existing rows
            snapshot.forEach(doc => {
                const userData = doc.data();
                // Filter users based on selected role
                if (roleFilter === 'all' || userData.role === roleFilter) {
                    const row = userTableBody.insertRow(); // Create a new row
                    row.insertCell(0).textContent = userData.email; // Email
                    row.insertCell(1).textContent = userData.name; // Name
                    row.insertCell(2).textContent = userData.password; // Password
                    row.insertCell(3).textContent = userData.role; // Role

                    const breakCell = row.insertCell(-1); // Insert a new cell at the end
                    breakCell.innerHTML = '<br>';
                }
            });
            console.log("Users fetched:", snapshot.size);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert('Error fetching users');
        }
    }


    fetchUsers();


    // ----------------------------------------------------------------------------
    //                                Role Filter
    // ----------------------------------------------------------------------------
    
    roleSelect.addEventListener('change', function() {
        const selectedRole = this.value;
        fetchUsers(selectedRole); // Fetch users based on selected role
    });



    // ----------------------------------------------------------------------------
    //                                Log Out
    // ----------------------------------------------------------------------------


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