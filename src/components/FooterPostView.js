import React from 'react';

export default  ( { id, title, url, thumbnail, DelPost } ) => (
            <div id = {id} className='FooterPostView' >
                <h1>{title}</h1>
                    {!thumbnail ? false :
                        <img className="thumbnail" src={thumbnail} alt="thumbnail"/>
                    }
                    <form action={url} target="_blank">
                        <input type="submit" value="GoToSource" />
                    </form>
                    <input type="submit" value="RunDry" onClick={ () => DelPost(id) }/>
            </div>
)