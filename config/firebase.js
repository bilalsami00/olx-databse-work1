// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore, setDoc, doc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADXXWLx9X7pkUfiezpii5R9D_0U6hEG74",
    authDomain: "learning-firebase-e149a.firebaseapp.com",
    projectId: "learning-firebase-e149a",
    storageBucket: "learning-firebase-e149a.appspot.com",
    messagingSenderId: "470823930367",
    appId: "1:470823930367:web:52e83eb18e54c255b6bfca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
// for firestore \|/ from https://firebase.google.com/docs/firestore/quickstart
const db = getFirestore(app)

async function signUpNewUser(userInfo){

    const { email, password } = userInfo

   const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
   await addUserToDb(userInfo, userCredentials.user.uid)

  //   .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...

  //   addUserToDb(userInfo)

  //   alert('signed in')
    
  //   // alert("Successfully registered ")
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   console.log("Error ---> ", errorMessage);
  // });

}

function signInUser(email, password){
   return signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  //   alert("u signed in")
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorMessage)
  // });
}


function addUserToDb(userInfo,uid) { 

  //                 short form of the object   
  //this is var shit    keys of objects      Object Name
           const    { email, fullname, age } = userInfo
                   // only 3 value out of  4==signUpFirebase({ email, password, fullname, age }) 
           return setDoc (doc(db, "users", uid), {email, fullname, age})
/*function of firestore...addDoc take 2 parameters                             */
    // return addDoc              (collection(db, "users"),      { email, fullname, age })
                  // (db, "users")==>keys of collection i.e 'users'      
      // .then(() => {
      //     alert('Successfully Registered')
      // })
      // .catch(e => {
      //     console.log('Error: ', e.message)
      // })
      
}

function postAdToDb(adTitle,price,description){
  const userId = auth.currentUser.uid
  return addDoc(collection(db, 'ads'), {adTitle,price,description,userId })
}

export {
    signUpNewUser,
    signInUser,
    postAdToDb
}