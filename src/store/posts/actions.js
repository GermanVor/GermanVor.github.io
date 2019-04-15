//удалить хуйню
import * as types from "./actionTypes";
import _ from 'lodash';
import redditService from '../../services/reddit';

export function addPostArray(PostArray){
    return {
        type:  types.ADD,
        PostArray
    }
}
export function fetchTopics() {
    return async (dispatch) => {
        try {
            const subredditArray = await redditService.getDefaultSubreddits();
          dispatch({ type: types.TOPICS_FETCHED, subredditArray });
        } catch (error) {
            console.error(error);
        }
    };
}
export function fetchPosts(selectedTopicUrl) {
    return async(dispatch) => {
        try {
            console.log(selectedTopicUrl);
            dispatch({ type: types.TOPICS_SELECTED, selectedTopicUrl});
            const fetchPromises =  [redditService.getPostsFromSubreddit(selectedTopicUrl)];
            const topicPosts = await Promise.all(fetchPromises);
            const postsById = Object.values(_.keyBy(_.shuffle(_.flatten(topicPosts)), (post) => post.id));
            dispatch({ type: types.POSTS_FETCHED,  postsById  });
        } catch (error) {
            console.error(error);
        }
    };
}
