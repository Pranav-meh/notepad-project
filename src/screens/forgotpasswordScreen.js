import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/images/paw.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/notes.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input}
           placeholder="Enter your email" 
           placeholderTextColor="gray"
           keyboardType="email-address" />
        </View>



        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>


      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 40,
    width: 199, position: 'absolute',
    top: 65
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#1f57a1'
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    backgroundColor: "#1f57a1",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: '#007BFF',
  }, background: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default LoginScreen;
