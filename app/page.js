'use client'

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { db} from './firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  where
} from 'firebase/firestore'

export default function Home() {

const [users, setUsers]=useState([])

const updateInventory = async () => {
  const snapshot = collection(db, 'users') //access firestore inventory collection location
  const docs = await getDocs(snapshot) //array of things in collection 
  const inventoryList = []
  //adds each item 
  docs.forEach((doc) => {
    inventoryList.push({ id: doc.id, name: doc.id, ...doc.data() })
  })
  setUsers(inventoryList)
}


const queryHobbies = async (event) => {
  event.preventDefault()
  try {
    // Create a reference to the 'users' collection
    const usersRef = collection(db, 'users');

    // Create a query to find users with a specific hobby
    console.log(event.target.hobbies.value)
    const q = query(usersRef, where('hobbies', 'array-contains', event.target.hobbies.value));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Handle the results
    const usersWithHobby = [];
    querySnapshot.forEach((doc) => {
      usersWithHobby.push({ id: doc.id, ...doc.data() });
    });

    // Return or process the results as needed
    setUsers(usersWithHobby)
  } catch (error) {
    console.error('Error querying hobbies: ', error);
    throw new Error('Failed to query hobbies.');
  }
};

const addItem = async (event) => {
  event.preventDefault();

  // Use FormData to get all form inputs
  const formData = new FormData(event.target);
  
  // Convert FormData to an object
  const formObject = Object.fromEntries(formData.entries());

  const { user, hobbies } = formObject;

  if (!user || !hobbies) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    const docRef = doc(collection(db, 'users'), user);
    await setDoc(docRef, { name: user, hobbies: hobbies }, { merge: true });
    await updateInventory();
    alert('User added/updated successfully');
  } catch (error) {
    console.error('Error adding user: ', error);
    alert('Failed to add user. Please try again.');
  }
};

const deleteItem = async(event,userId) =>{
  event.preventDefault();
  try{
    const docRef = doc(collection(db, 'users'), userId);
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error removing document: ', error);
  }

}
useEffect(() => {
  updateInventory()
}, [users])

  return (
    <div className={styles.page}>
      <h1>Users</h1>
      <ul>
  {users.map((user) => (
    <li key={user.id}>
      User: {user.name} <br/> Hobbies: {user.hobbies}
      <button onClick={(event) => deleteItem(event, user.name)}>Delete</button>
    </li>
  ))}
</ul>
    <form onSubmit={addItem}>
    <input placeholder="user" name="user" />
    <input placeholder="hobbies" name="hobbies" />
    <button type="submit">Add user</button>
</form>

<form onSubmit={queryHobbies}>
    <input placeholder="hobbies" name="hobbies" />
    <button type="submit">Query hobbies</button>
</form>

    </div>
  );
}
