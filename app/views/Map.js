import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
	StyleSheet,
	View,
	Linking,
	Text,
	Dimensions,
	Navigator,
} from 'react-native';

import { Icon, ButtonGroup } from 'react-native-elements';

import pinImage from '../../assets/img/clope3.png'
import tabacs from '../../assets/tabac/tabac.json'


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const markers = [];
let id = 0;
let lat ;
let lon ;

function openItinerary(lat,lon) {
	Linking.openURL(`http://maps.apple.com/?q=${lat},${lon}`)
};


function openInfo(id) {
	Linking.openURL(`http://maps.apple.com/?q=${lat},${lon}`)
};


function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


export default class MyMap extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	       region: {
	        latitude : 48.8627,
	        longitude: 2.2875,
	        latitudeDelta:0.1,
	        longitudeDelta:0.1
		 	},
			markers: [],
    	}
	}
	getInitialState = () => {
		var lat;
		var lon;
		navigator.geolocation.getCurrentPosition(
	       (postion) => {
	        	lat = postion.coords.latitude
	        	lon = postion.coords.longitude
	        	accuracy = postion.coords.accuracy

		});

	  return {
	    region: {
			latitude : 48.8627,
        	longitude: 2.2875,
        	latitudeDelta:0,
        	longitudeDelta: 0
	    },
	  };
	}

	onRegionChange = (region) => {
		// console.log(region);
		this.setState({ region });
		let markers = [];
		this.setState({ markers });
		this.markerUpdate(region);
	}

	markerUpdate = (region) => {
		tabacs.features.forEach(function(marker){
			var dist = distance(marker.properties.Latitude,marker.properties.Longitude,region.latitude,region.longitude)

			if (dist<2) {
				console.log(marker);
				markers.push(marker);
			}

		})
		this.setState({ markers });
	}

	componentWillMount() {

	}

	render() {
	    return (
	      <View style={styles.container}>
				<MapView
					style={styles.map}
		        	region={this.state.region}
		        	onRegionChange={this.onRegionChange}
					showsUserLocation={true}
					minZoomLevel={15}
					loadingIndicatorColor = {'#fff'}
				    loadingBackgroundColor= {'#FB005A'}
				>
				{this.state.markers.map(marker => (
					<MapView.Marker key={marker.id}
					title = {marker.properties.Nom}
					pinColor = "#FB005A"
					coordinate = {{
					latitude:marker.geometry.coordinates[1],
					longitude: marker.geometry.coordinates[0],
					}}
					>
					<MapView.Callout>
				   <View style={styles.icons}>
					<Text style={styles.introPresentation}>{marker.properties.Nom}
					</Text>
					<Icon
					  reverse
					  name='location-arrow'
					  type='font-awesome'
					  size={15}
					  color='#FB005A'
					  onPress={ () => openItinerary(marker.geometry.coordinates[1],marker.geometry.coordinates[0])}
					 />
					 <Icon
					   reverse
					   name='info'
					   type='font-awesome'
					   size={15}
					   color='#FB005A'
					   onPress={ () => openInfo(marker.properties.id)}
					  />
				   </View>
					</MapView.Callout>
					</MapView.Marker>
				))}

			</MapView>

	      </View>
	    );
	  }
	}







const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icons:{
	  flexWrap: 'wrap',
	  alignItems: 'flex-start',
	  flexDirection:'row',
	  alignItems:'center',
  },
  icon:{
	  flexDirection:'column',
  },
  introPresentation:{
	 fontSize: 20,

  }
});
