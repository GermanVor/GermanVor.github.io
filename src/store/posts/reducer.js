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
        case types.ADD:
            return state.merge({
                PostArray: [ ...state.PostArray, action.PostArray ]
            });
        case types.DelPost :{
            return state.merge({
                PostArray:  state.PostArray.filter(a => a.id !== action.id )
            });
        }
        case types.CLS:
            return state.merge({
                PostArray: []
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
