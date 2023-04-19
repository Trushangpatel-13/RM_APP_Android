import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'

import { Badge, Surface, Title, } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from './conts/colors';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const IconSizeApp = deviceWidth*0.08;
const IconSizeSearch = 40;

export const AppHeader = ({ style, menu, back, title, right, onRightPress, optionalBtn, onLeftPress, rightComponent, headerBg, iconColor, titleAlight, optionalBadge, search, barHeight, fweight }) => {

	const LeftView = () => (
		<View style={styles.view}>
			<TouchableOpacity onPress={onLeftPress}>
				<Feather name={menu} size={IconSizeApp} color={COLORS.black} />
			</TouchableOpacity>
			
		</View>
	)

    
	const RightView = () => (
		rightComponent ? rightComponent :
			<View style={[styles.view, styles.rightView,{height:deviceWidth*0.12}]}>
				
				<TouchableOpacity onPress={onRightPress} style={styles.iconstyle}>
					<Feather name={optionalBtn} size={IconSizeApp} color={COLORS.black} />
				</TouchableOpacity>
				
			</View>
	)
	const TitleView = () => (
		<View style={styles.titleView}>
			<Title style={{ color: COLORS.black, textAlign: titleAlight,fontWeight:fweight }}>{title}</Title>
		</View>
	)
	return (
		<Surface style={[styles.header, { backgroundColor: headerBg },{ height: barHeight }]}>
			<LeftView />
            
			<TitleView />
			<RightView />
		</Surface>
	)
}


export const SearchHeader = ({  onRightPress,  optionalBtnPress,  headerBg, iconColor, }) => {

	

    const Search = () => (
		<View style={{flex:1}}>
			<View
            style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginLeft:10
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          />
          <TextInput placeholder="Search" />
        </View>
        
		</View>
	)
	const RightView = () => (
			<View style={[styles.view, styles.rightView, {height:70}]}>
				<TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
					<Feather name='bell' size={IconSizeSearch} color={COLORS.red} />
					
				</TouchableOpacity>
				<TouchableOpacity onPress={onRightPress} style={styles.iconstyle}>
					<Feather name='bell' size={IconSizeSearch} color={COLORS.blue} />
				</TouchableOpacity>
			</View>
	)
	
	return (
		<Surface style={[styles.header, { backgroundColor: headerBg }]}>
            <Search />
			<RightView />
		</Surface>
	)
}


const styles = StyleSheet.create({
	header: {
		elevation: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: COLORS.black,
	},
	view: {
		marginHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
	},
	titleView: {
		flex: 1,
	},
	rightView: {
		justifyContent: 'flex-end',
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10,
	},
    iconstyle:{
        marginHorizontal:deviceWidth*0.02
    }
})