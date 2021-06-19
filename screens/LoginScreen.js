import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Image} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
        }
    }

    login = async(email, password) => {
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)
                if(response){
                    this.props.navigation.navigate('WriteStory')
                }
            }

            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert("User Doesn't Exist!")
                        console.log("user doesn't exist")
                        break

                    case 'auth/invalid-email':
                        Alert.alert("Incorrect Email or Password!")
                        console.log("invalid credentials")  
                        break   
                        
                    case 'auth/wrong-password':
                        Alert.alert("Enter the Correct Password!")
                        console.log("incorrect password")  
                        break   
                }                         
            }  
        }

        else{
            Alert.alert("Enter email and password");
        }
    }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: '#3C6382'}}>
            <KeyboardAvoidingView style = {{alignItems: 'center', marginTop: 20}}>
                <View>
                    <Text style = {{textAlign: 'center', fontSize: 40, marginTop: 30, color: 'white'}}>Bed Time Stories</Text>
                    <Image source = {require("../assets/booklogo.png")}
                           style = {{width: 210, height: 160, alignSelf: 'center', marginTop: 30, borderWidth: 5, borderRadius: 20, borderColor: 'white', marginBottom: 20}}
                    />
                    
                </View>

                <View>
                    <TextInput 
                        style = {styles.loginBox}
                        placeholder = "abc@example.com"
                        placeholderTextColor = 'white'
                        keyboardType = 'email-address'
                        onChangeText = {(text) =>{
                            this.setState({
                                emailId: text
                            })
                        }}>
                    </TextInput>


                    <TextInput
                        style = {styles.loginBox} 
                        secureTextEntry = {true}
                        placeholder = "Enter Password"
                        placeholderTextColor = 'white'
                        onChangeText={(text) =>{
                            this.setState({
                                password: text
                            })
                        }}
                    />

                </View>
                    <View> 
                        <TouchableOpacity style={{height: 40, width: 90, borderWidth: 2, marginTop: 30, paddingTop: 4, borderRadius: 10, borderColor: 'white'}}
                                          onPress = {() => {
                                              this.login(this.state.emailId, this.state.password)
                                          }}>
                                          <Text style = {{textAlign: 'center', color: 'white', fontSize: 20}}>Login</Text>
                        </TouchableOpacity>
                        </View>
            </KeyboardAvoidingView>
            </View>
                
        );
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth:2,
        borderRadius: 10,
        borderColor: 'white',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },
})