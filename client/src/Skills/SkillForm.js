import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Api from '../Api';

//to add new component, make new file
//to create (crud), use forms
function SkillForm() {

    //:id from Sections.js 
    const {id} = useParams();
    const history = useHistory();
    
    //initial value of section (in this case, obj with name, slug, and position attributes)
    const [skill, setSkill] = useState({
        name: '',
        slug: '',
        position: 0
    });

    //side effects, don't directly interact with output, don't refresh when it changes
    useEffect(function(){
        if(id){
            Api.skills.get(id).then((response) => setSkill(response.data));
        }
    }, []);

    function onChange(event) {

        //new object with current objects in section array
        const newSkill = { ...skill };
        
        //look for which name, and change the obj with that name with inputted 'value'
        //modify model (section)
        newSkill[event.target.name] = event.target.value;
        setSkill(newSkill);
    }
    //async function execute (multitasking) js continue running when server connects
    async function onSubmit(event) {
        event.preventDefault();

        //might cause error, wrap in try
        try {

            //update
            if(id){
                await Api.skills.update(id, skill);
            } else{
                await Api.skills.create(skill);
            }

            //add to browser history,, aka go to /sections
            history.push('/skills');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="container">
            <h1>Skill Form</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" name="name" value={skill.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input className="form-control" type="text" name="slug" value={skill.slug} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input className="form-control" type="text" name="position" value={skill.position} onChange={onChange} />
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <p>{JSON.stringify(skill)}</p>
        </main>
    );
}

export default SkillForm;