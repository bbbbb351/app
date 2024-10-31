// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, onSnapshot, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your Firebase configuration (replace with your details)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference the collection
const numbersRef = collection(db, 'numbers');

// Display the updated sum with animation
function displaySum(sum) {
  const sumElement = document.getElementById('sum');
  sumElement.textContent = sum;
  sumElement.style.transform = 'scale(1.2)';
  setTimeout(() => {
    sumElement.style.transform = 'scale(1)';
  }, 300); // reset the animation after 300ms
}

// Calculate and update the sum in real-time
let sum = 0;
onSnapshot(numbersRef, (snapshot) => {
  sum = 0; // Reset sum
  snapshot.forEach(doc => {
    sum += doc.data().value; // Assuming each doc has a field `value`
  });
  displaySum(sum);
});

// Optional: Adding numbers to Firestore (replace with your interface)
async function addNumber(value) {
  await addDoc(numbersRef, { value });
}
