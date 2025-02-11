import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bottom.png')} style={styles.image} />
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  image: {
    width: 100, 
    height: 100,  
  },
});
