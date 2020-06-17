export const ADD_DECK='ADD_DECK';
export const RECEIVE_INITIAL_DATA='RECEIVE_INITIAL_DATA';
export const ADD_QUESTION='ADD_QUESTION';
export const REMOVE_DECK='REMOVE_DECK';

export function AddDECK(deck)
{
    return{
        type:ADD_DECK,
        deck
    }
}
export function ReceiveInitailData(decks)
{
    return{
        type:RECEIVE_INITIAL_DATA,
        decks
    }
}
export function AddQUESTION(question,deckid)
{
    return{
        type:ADD_QUESTION,
        question,
        deckid,
    }
}
export function RemoveDeck(deckid)
{
    return{
        type:REMOVE_DECK,
        deckid
    }
}