import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Navigator,
} from 'react-native';

import { Button } from 'react-native-elements'

function locate() {
	navigator.geolocation.getCurrentPosition(
       (postion) => {
         var lat = postion.coords.latitude
         var lon = postion.coords.longitude
         var accuracy = postion.coords.accuracy
		  alert(`votre latitude est ${lat}, et longitude ${lon} ` );
	});
};


export default class Add extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.introText}>Bienvenu sur Tabac Ouvert</Text>
        <Text style={styles.introPresentation}>Cette application a pour but de vous aider a trouver le tabac le plus proche de vous.</Text>
        <Text style={styles.introPresentation}>Pour commencer vous devez autoriser votre géolocalisation</Text>

		<Button
		  large
		  onPress={locate}
		  icon={{name: 'location-arrow', type: 'font-awesome', color:'#FB005A' }}
		  color='red'
		  backgroundColor='#fff'
		  borderRadius={10}
		  title='Trouver un tabac' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FB005A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText:{
	  color:'#fff',
	  fontSize: 20,
	  fontWeight: '600',
	  marginBottom:55,
  },
  introPresentation:{
	  color:'#fff',
	  padding:2,
	  marginBottom:20,
	  textAlign: 'center',
  },
});
