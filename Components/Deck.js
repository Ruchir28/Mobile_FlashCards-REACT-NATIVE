import React,{Component} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,Animated} from 'react-native';
import {getDeck} from '../Utils/API'


class Deck extends Component
{
    state={
        bounceValue:new Animated.Value(1) 
    }
    Animated=()=>{
        const {bounceValue}=this.state;
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.5}),
            Animated.spring(bounceValue, { toValue: 1, friction: 4})
          ]).start()
    }
    render()
    {
        return(
        <TouchableOpacity onPress={()=>{
            this.Animated();
            this.props.onPress()
        }} style={styles.androidSubmitBtn}>
            <View style={[{
           
        }]}>
        <Text style={[styles.text]}>{this.props.deck.name}</Text>
        </View>
        </TouchableOpacity>)       
    }
}
const styles=StyleSheet.create({
    text:{
        color:'white',
        fontSize:14
    },
    androidSubmitBtn:{
        backgroundColor:'green',
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        height:55,
        borderRadius:2,
        justifyContent:'center',
        alignItems:"center",
        margin:20,
    },
    btn:{
    flexDirection:'row',
    margin:20
    }
    
})
export default Deck;