import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Dimensions, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import * as rssParser from 'react-native-rss-parser';
import CompleteFlatList from 'react-native-complete-flatlist';


const data = [
  { name: 'Boeing 737 Max plane crashes', status: 'Boeing legal troubles grew Tuesday as a new lawsuit accused the company of defrauding shareholders by concealing safety deficiencies in its 737 MAX planes before two fatal crashes led to their worldwide grounding.' },
  { name: 'NRA backs suit over Pittsburgh gun laws ', status: 'Gun rights groups sued Tuesday to block Pittsburgh from enforcing firearms legislation passed after a mass shooting at a synagogue, accusing city officials of blatantly defying the states prohibition on municipal gun regulation.'},
   { name: 'Prince William with British spy agencies', status: 'Prince William spent three weeks undercover with the U.K.’s top security and intelligence agencies, including MI6, Britain’s version of the CIA. The prince in a statement called it a “humbling experience.” NBC’s Keir Simmons reports for TODAY.'},
    { name: 'Know Where To Begin With Selfie Drones', status: 'It is only a fraction of the price that brand name drones come at – but its performance is just as good, if not better, compared to brand name drones. Its sleek, foldable design allows you to take it anywhere you can imagine.'},
     { name: 'Theresa May asks Europe', status: 'Politically weak and low on options, British Prime Minister Theresa May wrote to European Council President Donald Tusk on Friday to ask for the official divorce date to be pushed back to June 30.'},
      { name: 'Why much of the country is headed for $4 gas', status: 'A consortium of oil-producing countries has taken more than a million barrels a day off the market — and that’s the least of the problems plaguing American gasoline prices.'},
];

class HomeScreen extends React.Component {
  cell = (data,index) => {
      const item = data.cleanData ? data.cleanData : data

      console.log(data.cleanData)
      console.log('data.cleanData will be not null if search bar is not empty. caution, data without search is not same like data with search due to implement the highlight component. data.cleanData is equal to data')

      console.log('this is index number : '+index)

      console.log(item+' this is original data')

      return <View style={styles.itemForm}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.p}>{data.status}</Text>
      </View>;
    }

    render() {
      const { navigation } = this.props;
      return (
        <CompleteFlatList
        searchKey={['name', 'status']}
        highlightColor="yellow"
        data={data}
        ref={c => this.completeFlatList = c}
        renderSeparator={null}
        renderItem={this.cell}
        onEndReached={() => console.log("reach end")}
        onEndReachedThreshold={0}
      />
      );
    }
  }



class ProfileScreen extends React.Component {
  render() {
    return (
      <View>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.username}>John</Text>
              <Text style={styles.info}>Mobile developer</Text>
              <Text style={styles.description}>
              I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience.Also, I like to see the sunrise in the morning and the moonlight at night.
              </Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Sign out</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

class DaliyNews extends React.Component {
state = {};

    async componentDidMount() {
        try {
            await fetch('http://feeds.nytimes.com/nyt/rss/HomePage')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
              this.setState({RSS: rss});
            });
        }
        catch (error) {
            console.log("componentDidMount : " + error.message || error);
        }
    }

    render(){
        return (
            <View>
            <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 25, padding: 10, margin: 10, marginTop: 20}}>RSS DaliyNews</Text>
                <ScrollView style={{height: '100%'}}>
                {
                    this.state.RSS && this.state.RSS.items &&
                        this.state.RSS.items.map((element) => {
                            return (
                                <View style={styles.itemForm} >
                                <Image
                                  style={{width: 20, height: 20, }}
                                  source={{uri: 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/star-512.png'}}
                                />
                                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{element.title} </Text>
                                    <Text>{element.description}</Text>
                                    <Text style={{fontStyle: 'italic', marginTop: 5}}>{element.published}</Text>
                                </View>
                            )
                        })
                }
                </ScrollView>
            </View>
        )
    }
}

class Favorites extends React.Component {
  render() {
    return (
      <View style={[styles.scene, { backgroundColor: 'white', fontSize: 40, padding: 20, fontWeight: "600" }]}>
      <Text style={{ backgroundColor: 'lightgray', marginTop:20 }}>
      <Image
      style={{width: 20, height: 20, }}
      source={{uri: 'https://www.pinclipart.com/picdir/big/132-1321943_bookmark-celebrity-favorite-star-icon-transparent-background-star.png'}}
      />
        A toddler locked up his dad's iPad until 2067
      </Text>
      <Text style={{ backgroundColor: 'lightgray', marginTop:30 }}>
      <Image
      style={{width: 20, height: 20, }}
      source={{uri: 'https://www.pinclipart.com/picdir/big/132-1321943_bookmark-celebrity-favorite-star-icon-transparent-background-star.png'}}
      />
        Winter isn't over in the midwest
      </Text>
      <Text style={{ backgroundColor: 'lightgray', marginTop:20 }}>
      <Image
      style={{width: 20, height: 20, }}
      source={{uri: 'https://www.pinclipart.com/picdir/big/132-1321943_bookmark-celebrity-favorite-star-icon-transparent-background-star.png'}}
      />
        Opinion: Story of rhino poaching and man-eating lions is even more complicated
      </Text>
      <Text style={{ backgroundColor: 'lightgray', marginTop:30 }}>
      <Image
      style={{width: 20, height: 20, }}
      source={{uri: 'https://www.pinclipart.com/picdir/big/132-1321943_bookmark-celebrity-favorite-star-icon-transparent-background-star.png'}}
      />
        Pediatrics group wants sleeper recalled after more infant deaths
      </Text>
      <Text style={{ backgroundColor: 'lightgray', marginTop:20 }}>
      <Image
      style={{width: 20, height: 20, }}
      source={{uri: 'https://www.pinclipart.com/picdir/big/132-1321943_bookmark-celebrity-favorite-star-icon-transparent-background-star.png'}}
      />
        UCLA hires new basketball coach
      </Text>
      </View>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  DaliyNews: { screen: DaliyNews },
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Favorites: { screen: Favorites },
},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home${focused ? '' : ''}`;
        } else if (routeName === 'Favorites') {
          iconName = `md-star${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : ''}`;
        } else if (routeName === 'DaliyNews') {
          iconName = `logo-rss${focused ? '' : ''}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#20a8f7',
      inactiveTintColor: 'gray',
    },
  });

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#00BFFF",
  },
  scene: {
    flex: 1,
  },
    itemForm: {
        padding: 10,
        margin: 10,
    },
    header:{
    backgroundColor: "#20a8f7",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  username:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#20a8f7",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    color: "#ffffff",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    width:175,
    borderRadius:30,
    backgroundColor: "#20a8f7"
  },
  title: {
      marginBottom: 5,
      fontWeight:"700",
      fontSize: 16,
      backgroundColor: "#20a8f7",
      color: "white",
      padding: 10,
      borderRadius: 13,
    },
        p: {

    },
});

export default createAppContainer(TabNavigator);
