import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Dimensions, StatusBar } from 'react-native';



const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'black' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: 'white' }]} />
);
const ThirdRoute = () => (

  <View style={[styles.scene, { backgroundColor: 'blue' }]} >
    <Text>123</Text>
    </View>
);

class HomeScreen extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'News' },
      { key: 'second', title: 'Video' },
      { key: 'third', title: 'Favorites' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })
        }
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Profile: { screen: ProfileScreen },
},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home${focused ? '' : ''}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : ''}`;
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

  },
  scene: {
    flex: 1,
  },
});

export default createAppContainer(TabNavigator);
