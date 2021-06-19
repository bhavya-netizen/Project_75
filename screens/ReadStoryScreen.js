import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import {Header} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allStories: [],
            dataSource: [],
            search: '',
        }
    }

    componentDidMount(){
        this.retrieveStories();
    }

    updateSearch = search => {
        this.setState({search});
    }

    retrieveStories = () => {
        try {
            var allStories = []
            var stories = db.collection("stories").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    allStories.push(doc.data())
                    console.log("These are the stories", allStories)
                })
                this.setState({allStories});
            })
        }
        catch(error){
            console.log(error);
        }
    }

    SearchFilterFunction(text){
        const newData = this.state.allStories.filter((item) => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1; 
        });
        this.setState({
            dataSource: newData,
            search: text,
        });
    }

    render(){
        return(
            <View style = {styles.container}>
                <Header backgroundColor = {"#3C6382"}
                        centerComponent = {{
                            text: 'Bed Time Stories',
                            style: {
                                color: "white", fontSize: 20, fontFamily: 'cursive'
                            }
                        }}>
                </Header>

                <View styles = {{height: 15, width: '100%'}}>
                    <SearchBar
                       placeholder = "Type Here...."
                       placeholderTextColor = 'white'
                       onChangeText = {text => this.SearchFilterFunction(text)}
                       onClear = {text => this.SearchFilterFunction('')}
                       value = {this.state.search}>
                    </SearchBar>
                </View>

                <ScrollView>
                    <View>
                        {this.state.search === "" ? this.state.allStories.map((item) => (
                            <View style = {{borderColor: '#3C6382', borderWidth: 2, borderRadius: 10, padding: 10, alignItems: 'center', margin: 30}}>
                                <Text>
                                    Title: {item.title}
                                </Text>
                                <Text>
                                    Author: {item.author}
                                </Text>
                            </View>
                        ))
                        :
                        this.state.dataSource.map((item) => (
                            <View style = {{borderColor: '#3C6382', borderWidth: 2, borderRadius: 10, padding: 10, alignItems: 'center', margin: 30}}>
                                <Text>
                                    Title: {item.title}
                                </Text>
                                <Text>
                                    Author: {item.author}
                                </Text>
                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#3C6382',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: '#3C6382',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});