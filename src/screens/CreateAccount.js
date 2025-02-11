import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Platform, KeyboardAvoidingView, View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill both the fields!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password Error", "Password should be at least 6 characters long.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        Alert.alert("Success", "Your account has been created successfully!");
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Email Error", "That email address is already in use!");
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert("Email Error", "That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/paw.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient
          colors={['#FFFFFF', '#F0F4FF']}
          style={styles.gradientContainer}
        >
          <View style={styles.formContainer}>
            <Image
              source={require('../../assets/images/notes.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#999"
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
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              onPress={createUser}
              style={styles.loginButton}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  gradientContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 80,
    width: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f57a1',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1f57a1',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    width: '100%',
    backgroundColor: '#FFF',
  },
  loginButton: {
    width: '100%',
    backgroundColor: "#1f57a1",
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  signupText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CreateAccount;