import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../Api';

//to add new component, make new file
//to create (crud), use forms
function SectionForm(){

    const history = useHistory();
    //initial value of section (in this case, obj with name, slug, and position attributes)
    const [section, setSection] = useState({
        name: '',
        slug: '',
        position: 0
    });

    function onChange(event){
        //new object with current objects in section array
        const newSection = {...section};
        //look for which name, and change the obj with that name with inputted 'value'
        //modify model (section)
        newSection[event.target.name] = event.target.value;
        setSection(newSection);
    }
    //async function execute (multitasking) js continue running when server connects
    async function onSubmit(event){
        event.preventDefault();
        //might cause error, wrap in try
        try {
            await Api.sections.create(section);
            history.push('/sections');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="container">
            <h1>Section Form</h1> 
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" name="name" value={section.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input className="form-control" type="text" name="slug" value={section.slug} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input className="form-control" type="text" name="position" value={section.position} onChange={onChange}/>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <p>{JSON.stringify(section)}</p>
        </main>
    );
}

export default SectionForm;