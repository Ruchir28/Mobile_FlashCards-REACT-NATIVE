import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {AddDECK} from '../Actions/index'
import {submitEntry} from '../Utils/API'

class Adddeck extends Component
{
    state={
        title:''
    }
    submit=async ()=>{
        const key=Date.now();
        let entry={
            name:`${this.state.title}`,
            nextquestion:1,
            questions:{}
          }
          this.props.dispatch(AddDECK({
            [key]:{
              name:`${this.state.title}`,
              nextquestion:1,
              questions:{}
            }
        }));
        await submitEntry({entry,key});
       
        this.setState(()=>({title:''}));
        this.props.navigation.navigate('Decks');
             
    }
    onChangeText=(text)=>{
        this.setState(()=>({title:text}));
    }
    render()
    {
        return(
        <View style={{padding:40}}>
            <Text style={{fontSize:22,textAlign:'center',marginBottom:20,color:'orange'}}>
               Enter ur Deck Name
            </Text>
            <TextInput  onChangeText={text => this.onChangeText(text)} value={this.state.title} style={[styles.input,{marginTop:40}]}>
            </TextInput>
            <TouchableOpacity disabled={this.state.title===''}  onPress={()=>{
                console.log('clicked');
                this.submit()
            }}  style={styles.androidSubmitBtn}><Text style={styles.submitBtnText}>Submit</Text></TouchableOpacity>
        </View>)
    }
}

const styles=StyleSheet.create({

    input:{
        justifyContent:"center",
        alignItems:"center",
        height:40,
        margin:20,
        borderBottomColor:'gray',
        borderBottomWidth:1
    },
    androidSubmitBtn:{
        backgroundColor:'purple',
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        height:45,
        borderRadius:2,
        alignSelf:'flex-end',
        justifyContent:'center',
        alignItems:"center"
    },
    submitBtnText:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    }
})
function mapStateToProps(DeckEntries,{navigation})
{
    return{

    }
}
export default connect(mapStateToProps)(Adddeck);