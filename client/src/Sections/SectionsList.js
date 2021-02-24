import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Api from '../Api';

function SectionsList() {
    //model-- sections
    //controller-- the code, choosing what to be rendered
    //presentation-- whats printed

    const [sections, setSections] = useState([]);


    useEffect(function () {
        //Promise--------executed then will retrieve JSON data
        Api.sections.index().then(response => setSections(response.data));
    }, [])

    async function onDelete(section){
        if(window.confirm(`Are you sure you wish to delete ${section.name}?`)){
            //we'll execute code to delete the section
            Api.sections.delete(section.id).then(function() {
                //filter all items, keep those we don't want to delete
                const newSections = sections.filter(s => s.id != section.id);
                setSections(newSections);
            })
        }
    }
    //use Link not a because react-router-dom will not reload page to retrieve link
    //do not pass onDelete, it will pass event.target, not s
    return (
        <main className="container">
            <h1>Sections List</h1>
            <Link className="btn btn-primary" to="/sections/new">New</Link>
            <ul>
                {sections.map(s => (
                    <li>
                        <p><Link to={`/sections/${s.id}/edit`}>{s.name}, {s.slug}, {s.position}</Link></p>
                        <p> <button onClick={() => onDelete(s)} type="button" className="btn btn-sm btn-danger">Delete</button></p>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default SectionsList;