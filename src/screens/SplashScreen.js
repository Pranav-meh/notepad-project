import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useNavigation } from '@react-navigation/native'; 

export default function SplashScreen({ setSplashVisible }) {
    const navigation = useNavigation();

    useEffect(() => {
        const checkUserLogin = async () => {
            try {
                const uuid = await AsyncStorage.getItem('userUUID');
                
                if (uuid) {
                    navigation.replace('Dashboard');  
                } else {
                    navigation.replace('Login'); 
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                navigation.replace('Login');  
            }
        };

        checkUserLogin();

        const timer = setTimeout(() => {
            setSplashVisible(false);
        }, 5000);

        return () => clearTimeout(timer); 
    }, [setSplashVisible, navigation]);

    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.animation} source={require('../../assets/images/notes.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6'
    },
    animation: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#3b82f6',
        fontFamily: 'Arial',
        letterSpacing: 1,
    }
});
