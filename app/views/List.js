import React from 'react';
import {
	StyleSheet,
	View,
	Navigator,
	ScrollView,
} from 'react-native';

import { List, ListItem } from 'react-native-elements';

import tabacs from '../../assets/tabac/tabac.json'


function coucou() {
	alert('coucou')
}


function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

const markers = [];


export default class ListTabac extends React.Component {
	componentWillMount() {
		var lat = 48.862;
	  	var lon = 2.2875;
	  	var accuracy;

	  	tabacs.features.forEach(function(marker){
	  		var dist = distance(marker.properties.Latitude,marker.properties.Longitude,lat,lon)

	  		if (dist<2) {
	  			markers.push(marker);
	  		}

	  	})

	}
  render() {
    return (
		<ScrollView>
			<List style={styles.container}>
				    {
				      markers.map((l, i) => (
				        <ListItem
					        leftIcon={{name: "map-pin"  ,type:'font-awesome', color:'#FB005A'}}
							chevronColor={'#FB005A'}
							underlayColor={'#FB005A'}
							onPress={coucou}
					        key={i}
					        title={l.properties.Nom}
				        />
				      ))
				    }
			</List>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	paddingTop:10,
  },
  listText:{
	  color:'#FB005A',
	  fontSize: 2,
	  fontWeight: '600',
  },

});
