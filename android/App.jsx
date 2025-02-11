import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/AppNavigator";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4An6QGzoVpSud7dDIF8HW6ey4qn6ypdQ",
  authDomain: "notepad-efa4e.firebaseapp.com",
  projectId: "notepad-efa4e",
  storageBucket: "notepad-efa4e.firebasestorage.app",
  messagingSenderId: "780730735304",
  appId: "1:780730735304:web:57ac73921b7714d14b23fd"
};

const app = initializeApp(firebaseConfig);

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
