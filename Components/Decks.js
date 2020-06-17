import React,{Component} from 'react';
import { Text, ScrollView } from 'react-native';
import {getDeck, setLocalNotification} from '../Utils/API'
import Deck from './Deck'
import {connect} from 'react-redux'
import {ReceiveInitailData} from '../Actions/index'
import {fetchResults} from '../Utils/API'

class Decks extends Component
{
    state={
        Decks:'',
        Async:''
    }
    componentDidMount()
    {
        //this.props.dispatch(ReceiveInitailData(getDeck()));
        setLocalNotification();
        fetchResults().then((data)=>{
        this.props.dispatch(ReceiveInitailData(data))
        this.setState(()=>({Async:data}))});    
    }
    onPress=(deckid)=>{

        this.props.navigation.navigate('ViewDeck',{
            deckid
        });
    }
    render()
    {
        return(
            <ScrollView style={{padding:40}}>
                {/* <Text>ASYNC-DATA-{JSON.stringify(this.state.Async)}</Text>
                <Text>{JSON.stringify(this.props.Decks)}</Text> */}
                {Object.keys(this.props.Decks).map(key=><Deck onPress={()=>{this.onPress(key)}} key={key} deck={this.props.Decks[key]}></Deck>)}
            </ScrollView>
            )
    }
}
function mapStatetoProps(DecksEntries,{navigation})
{
    return{
       Decks:DecksEntries
    }
}
export default connect(mapStatetoProps)(Decks);