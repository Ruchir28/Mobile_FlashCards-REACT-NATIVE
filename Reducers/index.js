import {ADD_DECK,RECEIVE_INITIAL_DATA,ADD_QUESTION,REMOVE_DECK} from '../Actions/index'
export default function DecksEntries(state={},action)
{
    switch(action.type)
    {
        case RECEIVE_INITIAL_DATA:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.deckid]:{
                    ...state[action.deckid],
                    questions:{
                        ...state[action.deckid].questions,
                        [state[action.deckid].nextquestion]:action.question
                    },
                    nextquestion:state[action.deckid].nextquestion+1,
                }
            }
        case REMOVE_DECK:
            return{
                ...Object.keys(state).filter(id=>id!=action.deckid).map(id=>state[id])
            }
        default:
            return state
    }

}