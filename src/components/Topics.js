import React from 'react';

export default ( { CheckWrapper, subredditArray} ) =>(
        <ul className='Topics'>
            { subredditArray.map( (a,ind) => <li key={'Topic_key_+' + ind } >{ CheckWrapper(a)}</li> )}
        </ul>
)
 