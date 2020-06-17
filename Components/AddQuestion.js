import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {AddQUESTION} from '../Actions/index'
import { submitEntry, addQUESTIONAPI } from '../Utils/API';

class AddQuestion extends Component
{
    state={
        ques:'',
        ans:''
    }
    submit=()=>{
        this.props.dispatch(AddQUESTION({
            question:this.state.ques,
            ans:this.state.ans
        },this.props.route.params.deckid));
        addQUESTIONAPI(this.props.route.params.deckid,{
            question:this.state.ques,
            ans:this.state.ans
        });
        this.setState(()=>({ans:'',ques:''}));
        this.props.navigation.goBack();
    }
    onChangeText=(text,tobechanged)=>{
        this.setState(()=>({[tobechanged]:text}));
    }
    render()
    {
        return(
        <View>
             <Text style={{fontSize:18,textAlign:'center',marginBottom:10,color:'orange'}}>
               Enter ur Question here
            </Text>
            <TextInput  onChangeText={text => this.onChangeText(text,"ques")} value={this.state.ques} style={[styles.input,{marginTop:5}]}>
            </TextInput>
            <Text style={{fontSize:18,textAlign:'center',marginBottom:10,color:'orange'}}>
             Enter ans here
            </Text>
            <TextInput  onChangeText={text => this.onChangeText(text,"ans")} value={this.state.ans} style={[styles.input,{marginTop:5}]}>
            </TextInput>
            <TouchableOpacity disabled={this.state.ques==='' || this.state.ans===''}  onPress={()=>{
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
        justifyContent:'center',
        alignItems:"center"
    },
    submitBtnText:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    }
})
function mapStateToProps(DeckEntries,{route,navigation})
{
    return{
        DeckEntries
    }
}
export default connect(mapStateToProps)(AddQuestion);