import React from 'react';
//странный способ вложенности,скорее всего практиковался 
export default ({CheckWrapper, subredditArray}) => (
    <ul className='Topics'>
        { subredditArray.map( (a,ind) => <li key={'Topic_key_+' + ind } >{ CheckWrapper(a)}</li> )}
    </ul>
)
 