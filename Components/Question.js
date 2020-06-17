import React,{Component} from 'react';
import {Text,View,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Question extends Component
{
    state={
        showans:false
    }
    onPress=()=>{
        this.setState((prevState)=>({showans:!prevState.showans}));
    }
    render()
    {
        return(<View>
            <Text style={[this.submitBtnText,{fontSize:22},{textAlign:'center'}]}>
                {this.props.question.question}
            </Text>
            <TouchableOpacity onPress={this.onPress} style={styles.androidSubmitBtn}><Text>Show Ans</Text></TouchableOpacity>
            <View>
               {this.state.showans && (
            <View>
             <Text style={[this.submitBtnText,{fontSize:22},{textAlign:'center'}]}>{this.props.question.ans}</Text>
             <View style={styles.con}>
              <TouchableOpacity style={styles.BtnG} onPress={()=>{this.props.onClick(true);this.onPress()}} ><Text style={styles.submitBtnText}>Correct</Text></TouchableOpacity>
              <TouchableOpacity style={styles.BtnR} onPress={()=>{this.props.onClick(false);this.onPress()}}><Text style={styles.submitBtnText}>Incorrect</Text></TouchableOpacity>
             </View>
            </View>
               )}
               </View>

        </View>)
    }
}
const styles=StyleSheet.create({
   BtnR:{
        backgroundColor:'red',
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        height:45,
        borderRadius:2,
        justifyContent:'center',
        alignItems:"center",
        marginTop:50,

      
    },BtnG:{
        backgroundColor:'green',
        
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        height:45,
        borderRadius:2,
        justifyContent:'center',
        alignItems:"center",
        marginTop:50,
      
    },
    androidSubmitBtn:{
        backgroundColor:'orange',
        padding:10,
        paddingLeft:30,
        paddingRight:30,
        height:45,
        borderRadius:2,
        justifyContent:'center',
        alignItems:"center",
        marginTop:50,
    },
    colorR:{
        backgroundColor:'red'
    }, colorG:{
        backgroundColor:'green'
    },
    submitBtnText:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    },
    con:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:"space-around"

    }
})
export default Question;