import * as React from 'react';
import { Button, Image, View, Text, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import uuid from 'uuid'

export default class ImagePickerr extends React.Component {
  state = {
    image: null,
    isUploading:false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1,paddingTop:100, alignItems:'center'}}>
        {
          this.state.isUploading && <ActivityIndicator/>
        }
     
      <Text style={{padding:20,color:'white',backgroundColor:'#242424',fontFamily:'Roboto',fontSize:15,marginBottom:80,borderRadius: 20}} onPress={this._pickImage}>
        Pick an Image from Camera Roll
      </Text>
        {image &&
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log('hello');
      const firebaseConfig = {
        apiKey: "AIzaSyAvFJHSa8iy--sCqImi78PAJPLRWWXYCtY",
        authDomain: "image-caption-cff0d.firebaseapp.com",
        databaseURL: "https://image-caption-cff0d.firebaseio.com",
        projectId: "image-caption-cff0d",
        storageBucket: "gs://image-caption-cff0d.appspot.com",
        messagingSenderId: "828074449089",
        appId: "1:828074449089:web:d4c7b6316af4979a259c40",
        measurementId: "G-LDK33DNS72"
      };
      firebase.initializeApp(firebaseConfig);
      const filename= uuid()+"."+ result.uri.split('.').pop();

      console.log(filename);
      try{
        const response = await fetch(result.uri);
        const blob= await response.blob();
        var storageRef= firebase.storage().ref();

        var imageRef = storageRef.child(filename);
        imageRef.put(blob).then(snapshot => {
          var storage = firebase.storage();
          var pathReference = storage.ref(filename);
          pathReference.getDownloadURL().then(url =>{
            console.log(url);
            
          }) 
        } )
      }
      catch{
        console.log("nnn")
      }

     
    }
  };
}

