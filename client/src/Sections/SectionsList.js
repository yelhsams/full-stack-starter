import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    //use Link not a because React will not refresh page to retrieve link
    return(
        <main className= "container">
            <h1>Sections List</h1>
            <Link className="btn btn-primary" to="/sections/new">New</Link>
            <ul>
               {sections.map(s => (
                   <li>{s.name}, {s.slug}, {s.position}</li>
               ))}
            </ul>
        </main>
    );
}

export default SectionsList;