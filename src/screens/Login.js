import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill both the fields!");
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (item) => {
        console.log('User signed in!', item);
        const uid = item.user.uid;

        try {
          await AsyncStorage.setItem('userUUID', uid);
          Alert.alert("Success", `Logged in successfully!`);
          navigation.navigate('Dashboard'); 
        } catch (error) {
          console.error('Error storing UUID:', error);
          Alert.alert("Error", "Could not store login information.");
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert("Login Error", "No user found with this email.");
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert("Login Error", "Incorrect password.");
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert("Email Error", "That email address is invalid!");
        } else {
          console.error(error);
          Alert.alert("Login Error", "Something went wrong. Please try again.");
        }
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/paw.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient
          colors={['#FFFFFF', '#F0F4FF']}
          style={styles.gradientContainer}
        >
          <Image
            source={require('../../assets/images/notes.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="gray"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')} 
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={loginUser}
            style={styles.loginButton}
          >
            <LinearGradient
              colors={['#1f57a1', '#3a7bd5']}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f57a1',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#1f57a1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#FFFFFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1f57a1',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
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
  footerText: {
    fontSize: 14,
    color: '#1f57a1',
  },
  signupText: {
    color: '#1f57a1',
    fontWeight: 'bold',
  }, 
  background: {
    flex: 1,
  }
});

export default Login;