import React, { Component } from 'react';
import Question from './Question'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';


class TakeQuiz extends Component
{
    state={
        total:'',
        correctlyAnswered:0,
        currentQuestion:1
    }
    onClick=(val)=>{
        let increment=val?1:0;
        this.setState((prevState)=>({correctlyAnswered:prevState.correctlyAnswered+increment,
            currentQuestion:prevState.currentQuestion+1}));
    }
    StartQuizAgain=()=>{
        this.setState(()=>({correctlyAnswered:0,currentQuestion:1}));
    }
    BackToDeck=()=>{
        this.props.navigation.goBack();
    }
    componentDidMount()
    {
        this.setState(()=>({total:Object.keys(this.props.DeckEntries[this.props.route.params.deckid].questions).length}))
    }
    render()
    {
        if(this.state.currentQuestion>this.state.total)
        {
            return(<View>
                <Text style={[this.submitBtnText,{fontSize:22},{textAlign:'center'}]}>You Completed the Quiz</Text>
                <Text style={[this.submitBtnText,{fontSize:16},{textAlign:'center'}]}>You answered {this.state.correctlyAnswered} correctly out of {this.state.total}</Text>
                <TouchableOpacity onPress={this.StartQuizAgain} style={[styles.androidSubmitBtn,{backgroundColor:'green'}]}  style={styles.androidSubmitBtn}><Text style={styles.submitBtnText}>Start Quiz Again</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.BackToDeck} style={[{backgroundColor:'green'},styles.androidSubmitBtn]}  style={styles.androidSubmitBtn}><Text style={styles.submitBtnText}>Back To Deck</Text></TouchableOpacity>
            </View>)
        }
        return(<View>
            <Text style={[this.submitBtnText,{fontSize:15},{textAlign:'center'},{marginTop:10},{marginBottom:10}]}>No of Questions Remaining {this.state.total-this.state.currentQuestion}</Text>
            <Question onClick={this.onClick} question={this.props.DeckEntries[this.props.route.params.deckid].questions[this.state.currentQuestion]}></Question>

        </View>)
    }

}
function mapStateToProps(DeckEntries,{route,navigation})
{
    return{
        DeckEntries
    }
}
const styles=StyleSheet.create({
    androidSubmitBtn:{
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
    color:{
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

    }
})
export default connect(mapStateToProps)(TakeQuiz);