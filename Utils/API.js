import {AsyncStorage} from 'react-native'
import Deck from '../Components/Deck';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const NOTIFICATION_KEY='MOBILE:FLASHCARDDS:NOTIFICATIONS';

const STORAGE_KEY='Mobilea:FLASHCARSv:STORjsAnvkjn_KEdjsY_qwd_app_here-kxalm'

const Decks={
    "i1": {
        name:'deck1',
        nextquestion:2,
        questions:{
            1:{
                question:'Who is the president here',
                ans:'Me'
            }
        }

      },
      "i2":{
        name:'deck2',
        nextquestion:2,
        questions:{
            1:{
                question:'Who is the president there',
                ans:'You'
            }
        }

      }
}


export async function fetchResults()
{
    
    try{
    let data= await AsyncStorage.getItem(STORAGE_KEY);
    if(!data)
    {
        data={...Decks}
    }
    return JSON.parse(data);
    }
    catch(err)
    {
        console.log('ERROR:',err)
    }
}
export async function submitEntry({entry,key})
{
    try{
    await AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
        [key]:entry
    }))
    return;
    }
    catch(err)
    {
        console.log('ERROR-here',err);
    }
}
export async function removeEntry(key)
{ 
    try{
    let results=await AsyncStorage.getItem(STORAGE_KEY);
    let data=JSON.parse(results);
    data[key]=undefined;
    delete data[key];
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(data));
    console.log('deleted');
    return results;
    }
    catch(err)
    {
        console.log('ERROR IN REMOVEENTRRY API CALL:',err)
    }
}
export async function addQUESTIONAPI(key,question)
{
    try{
        console.log(question);
        let results=await AsyncStorage.getItem(STORAGE_KEY);
        let state=JSON.parse(results);
        state={
                ...state,
                [key]:{
                    ...state[key],
                    questions:{
                        ...state[key].questions,
                        [state[key].nextquestion]:question
                    },
                    nextquestion:state[key].nextquestion+1,
                }
            }
        console.log(state);
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(state));
        console.log('Question Added');
        return results;
        }
        catch(err)
        {
            console.log('ERROR IN ADDQUESTION API CALL:',err)
        }

}
export function getDeck()
{
    return Decks;
}

//NOTIFIACTOON-----------------------------------------------------------------

  export function clearLocalNotification()
  {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(()=>Notifications.cancelAllScheduledNotificationsAsync())
  }
  function createNotification()
  {
    return{
      title:'Take A Quiz',
      body:"👋 Don't Forget To Take a Quiz Today",
      ios:{
        sound:true
      },
      android:{
        sound:true,
        priority:'high',
        sticky:false,
        vibrate:true
      }
    }
  }
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate())
                tomorrow.setHours(18)
                tomorrow.setMinutes(0)
                tomorrow.setSeconds(tomorrow.getSeconds()+25)
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }