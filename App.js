import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CaptionGenerator from './Components/main';
import ImagePickerr from './Components/camera';


export default function App() {
  return (
    <View style={styles.container}>
      <Text></Text>
      
      <ImagePickerr/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
