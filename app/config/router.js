import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


import Add from '../views/Add';
import myMap from '../views/Map';
import ListTabac from '../views/List';

export const Tabs = TabNavigator({
	Map : {
		screen : myMap,
		navigationOptions: {
				tabBarLabel: 'Map',
				tabBarIcon: ({tintColor}) => <Icon name="map" size={30} color={tintColor}/>
		},
	},
	List : {
		screen : ListTabac,
		navigationOptions: {
				tabBarLabel: 'List',
				tabBarIcon: ({tintColor}) => <Icon name="list" size={30} color={tintColor}/>
		},
	},
	Add : {
		screen : Add,
		navigationOptions: {
				tabBarLabel: 'Add',
				tabBarIcon: ({tintColor}) => <Icon name="plus" type='font-awesome' size={30} color={tintColor}/>
		},
	},
})
