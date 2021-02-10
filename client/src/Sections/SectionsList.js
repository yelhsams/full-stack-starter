import { useEffect, useState } from 'react';

import Api from '../Api';

function SectionsList(){
    //model-- sections
    //controller-- the code, choosing what to be rendered
    //presentation-- whats printed

    const [sections, setSections] = useState([]);


    useEffect( function() {
        //Promise--------executed then they will retrieve JSON data
        Api.sections.index().then(response => setSections(response.data));
    }, [])
    return(
        <main className= "container">
            <h1>Sections List</h1>
            <ul>
               {sections.map(s => (
                   <li>{s.name}</li>
               ))}
            </ul>
        </main>
    );
}

export default SectionsList;