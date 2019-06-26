import React from 'react';

export default ( { CheckWrapper, subredditArray} ) =>(
        <ul className='Topics'>
            { subredditArray.map( (a) => <li >{ CheckWrapper(a)}</li> )}
        </ul>
)
 