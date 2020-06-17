import React,{Component} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {RemoveDeck} from '../Actions/index'
import {removeEntry, clearLocalNotification} from '../Utils/API'

class ViewDeck extends Component
{
    state={
        deleting:false
    }
    onPressthere=()=>{
        clearLocalNotification();
        this.props.navigation.navigate('TakeQuiz',{
            deckid:this.props.route.params.deckid,
          
        });
    }
    onPress=()=>{
        this.props.navigation.navigate('AddQuestion',{
            deckid:this.props.route.params.deckid
        });
    }
    Delete=async ()=>{
        this.setState(()=>({deleting:true}));
        await removeEntry(this.props.route.params.deckid);
        this.setState(()=>({deleting:false}));
        this.props.navigation.navigate('Decks');
        this.props.dispatch(RemoveDeck(this.props.route.params.deckid));
     
 
    }
    render()
    {
        if(this.state.deleting)
        {
            return(<View><Text>Deleting....</Text></View>)
        }

        if(!this.props.DeckEntries[this.props.route.params.deckid])
        {
            return(
                <View>
                    <Text>You Deleted this</Text>
                </View>
            )
        }
        return(
            <View>
                <Text style={{fontSize:22,textAlign:'center',marginBottom:10,color:'black'}}>{this.props.DeckEntries[this.props.route.params.deckid].name}</Text>
                <Text style={{fontSize:18,textAlign:'center',marginBottom:10,color:'gray'}}>No of Cards-{Object.keys(this.props.DeckEntries[this.props.route.params.deckid].questions).length}</Text>
                <TouchableOpacity onPress={this.onPress} style={styles.androidSubmitBtn}><Text class={styles.submitBtnText}>ADD CARD</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{console.log('action clicked');this.onPressthere()}} disabled={Object.keys(this.props.DeckEntries[this.props.route.params.deckid].questions).length===0} style={styles.androidSubmitBtn}><Text class={styles.submitBtnText}>Start Quiz</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.Delete} style={styles.androidSubmitBtn}><Text class={styles.submitBtnText}>Delete Deck</Text></TouchableOpacity>

            </View>
        )
    }

}
const styles=StyleSheet.create({
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
    submitBtnText:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    }
})
function mapStateToProps(DeckEntries,{navigation,route})
{
    return{
        DeckEntries
    }
}
export default connect(mapStateToProps)(ViewDeck);
