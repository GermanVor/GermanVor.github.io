import React from 'react';

export default function  AllPostsView(props){//extends Component
        return (
            <div id = {props.id} className='ViewPost'>
                <h3>{props.title}</h3>
                <form action={props.url} target="_blank">
                    <input type="submit" value="GoToSource"  />
                </form>
                {!props.thumbnail ? false :
                    <img className="thumbnail" src={props.thumbnail} alt="thumbnail"/>
                }
            </div>
        );
}
