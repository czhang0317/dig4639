import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Button from "./Button";
import * as Expo from "expo";
import Forecast from "./Forecast";

import LocationButton from "./LocationButton";
import textStyles from "./styles/typography.js";

const STORAGE_KEY = "@SmarterWeather:zip";

import OpenWeatherMap from "./open_weather_map";

// This version uses flowers.png from local assets
//import PhotoBackdrop from "./PhotoBackdrop/local_image";

// This version pulls a specified photo from the camera roll
 import PhotoBackdrop from './PhotoBackdrop/local_image';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    title: 'Home',
    this.state = { currentTime: null };
    this.state = { forecast: null };

  }


  static navigationOptions = {
  title: 'Home',
};

  componentWillMount()
  {
      this.getCurrentTime();
  }

  getCurrentTime = () =>
  {
      let hour = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      let am_pm = 'pm';

      if( minutes < 10 )
      {
          minutes = '0' + minutes;
      }

      if( seconds < 10 )
      {
          seconds = '0' + seconds;
      }

      if( hour > 12 )
      {
          hour = hour - 12;
      }

      if( hour == 0 )
      {
          hour = 12;
      }

      if( new Date().getHours() < 12 )
      {
          am_pm = 'am';
      }

      this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

  }


  checkMultiPermissions = async() => {
    const { Permissions, FileSystem } = Expo;
    console.log(FileSystem.documentDirectory);
    let { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      console.log('Hey! You heve not enabled selected permissions');
      const { newStatus, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      status = newStatus;
    }
    if(status === 'granted') {
        console.log("Granted!");
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        })

        console.log(result);
          if (!result.cancelled) {
            console.log(this);
            console.log("Accepted!");
            this.setState({ newPostImage:result.uri, createPostModalVisible: true })
            FileSystem.copyAsync({from:result.uri,to:FileSystem.documentDirectory+"myimage.jpg"})
            .then(() => console.log("Moved to location"));
            try {
              await AsyncStorage.setItem('@MySuperStore:key', result.uri)
              .then(() => console.log("Saved selection to disk: " + result.uri))
              .catch(error => console.error("AsyncStorage error: " + error.message))
              .done();
              console.log("saved");
              this._retrieveData();
            } catch (error) {
              // Error saving data
            }
          }
      }

  }
  _retrieveData = async () => {
      console.log("Retrieving Data");
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
          if (value !== null) {
            // We have data!!
            console.log("Got data");
            console.log(value);
            this.setState({ newPostImage:value, createPostModalVisible: true })
          } else {
            console.log("No data");
          }
        } catch (error) {
          console.log(error);
          // Error retrieving data
        }
      }

  componentDidMount() {

    _getCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        initialPosition => {
          this._getForecastForCoords(
            initialPosition.coords.latitude,
            initialPosition.coords.longitude

        )},
        error => {
          alert(error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }


    _getCoordinates();

    this.myInterval = setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleTimeString()
        })
      },1000);

    let scrollValue = 0;
    setInterval(function(){
      scrollValue = scrollValue + 500;   // width = screen width
      _scrollView.scrollTo({x: scrollValue})
    }, 3000);

    this.timer = setInterval(() =>
    {
        this.getCurrentTime();
    }, 1000);

    AsyncStorage
      .getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();
      this._retrieveData();
  }

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage
      .setItem(STORAGE_KEY, zip)
      .then(() => console.log("Saved selection to disk: " + zip))
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();

    OpenWeatherMap.fetchZipForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    });
  };

  _getForecastForCoords = (lat, lon) => {
    OpenWeatherMap.fetchLatLonForecast(lat, lon)
      .then(forecast => {
        this.setState({ forecast: forecast });
    });
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };


  render() {
    let content = null;
    console.log("Rendered" + this.state.newPostImage);
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
<Text style={{ color: "#ffffff", fontSize: 32 }}>{this.state.curTime}</Text>
          <Forecast
            main={this.state.forecast.main}
            temp={this.state.forecast.temp}
          />
        </View>
      );
    }

    return (

      <PhotoBackdrop image={this.state.newPostImage} >

        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style = {styles.text2}>
              Forecast for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                style={[textStyles.mainText, styles.zipCode]}
                onSubmitEditing={this._handleTextChange}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.row}>
<LocationButton onGetCoords={this._getForecastForCoords} />
          </View>
          <View style={styles.row}>
            <Button onPress={this.checkMultiPermissions} label="Choose Image"></Button>
          </View>
          <View style={styles.row}>
              <Text style = { styles.timeText }>{ this.state.currentTime }</Text>
          </View>
          {content}

<View>
<TouchableOpacity style={styles.settings} activeOpacity={0.5}
onPress={() => this.props.navigation.navigate('Settings')}>

   <Image
    source={require('./assets/settings.png')}
    style={styles.ImageIconStyle}
    />

   <View style={styles.SeparatorLine} />

 </TouchableOpacity>
 </View>

        </View>
        <View>
    <ScrollView
     ref={(scrollView) => { _scrollView = scrollView; }}
     horizontal={true} pagingEnabled={true}
     >
       <Image source={require('./assets/1.jpg')} />
       <Image source={require('./assets/2.jpg')} />
       <Image source={require('./assets/3.jpg')} />
       <Image source={require('./assets/4.jpg')} />
       <Image source={require('./assets/5.jpg')} />
    </ScrollView>
    </View>
      </PhotoBackdrop>
    );
  }
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(0,0,0,0.1)" },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  zipContainer: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 80,
    height: textStyles.baseFontSize * 2,
    justifyContent: "flex-end"
  },
  timeText: {
    fontSize: 25,
    color: "white"
  },
  settings: {
    alignItems: 'center',
  },
  ImageIconStyle: {
    width: 80,
    height: 80
  },
  zipCode: { flex: 1 },
  text2: { fontSize: 25,
  color: "white"
  }
});

export default WeatherProject;
