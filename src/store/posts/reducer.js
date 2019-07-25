import * as types from "./actionTypes";
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    subredditArray: [],
    PostArray : [],
    selectedTopicUrl : undefined,
    postsById : [],
    isExit : false
});

export default function Reducer (state = initialState, action = {} ) {
    switch (action.type) {
        case types.ADD: {
            if(state.PostArray.every( (a) => a.id !== action.PostArray.id)){
            AddLocalPostArray(action.PostArray)
            return state.merge({
                PostArray: [ ...state.PostArray, action.PostArray ]
            });
            }
        }
        case types.DelPost :{
            DelLocalPostArray(action.id)
            return state.merge({
                PostArray:  state.PostArray.filter(a => a.id !== action.id )
            });
        }
        case types.CLS_PostArray:
            localStorage.clear()
            return state.merge({
                PostArray: []
            });
        case types.CLS_postsById:
            return state.merge({
                postsById: []
            });  
        case types.TOPICS_FETCHED:
            return state.merge({
                subredditArray: action.subredditArray
            });
        case types.POSTS_FETCHED:
            return state.merge({
                postsById: action.postsById
            });
        case types.TOPICS_SELECTED:
            return state.merge({
                selectedTopicUrl: action.selectedTopicUrl
            });
        case types.EXIT : 
            return state.merge({
                isExit :  !state.isExit
            });
        default:
            return state;
    }
}
// selectors
export function getTopics(state) {
    return state.subredditArray;
}
export function getPostArray(state) {
    return   state.PostArray;
}
export function  getAllPosts(state) {
    return state.postsById;
}

function AddLocalPostArray(obj){
    var LocalPostArray = JSON.parse(localStorage.getItem("LocalPostArray")) || [];
    LocalPostArray.push(obj)
    localStorage.removeItem("LocalPostArray");
    localStorage.setItem("LocalPostArray", JSON.stringify(LocalPostArray));
}

function DelLocalPostArray(id){
    var LocalPostArray = JSON.parse(localStorage.getItem("LocalPostArray")) || [];
    LocalPostArray =   LocalPostArray.filter(a => a.id !== id )
    localStorage.setItem("LocalPostArray", JSON.stringify(LocalPostArray));
}