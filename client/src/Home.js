import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import Api from './Api';
import {useAuthContext} from './AuthContext';
import me from './me.jpg';

function Home() {
  const {user} = useAuthContext();
  const [sectionItems, setSectionItems] = useState([]);

  useEffect(function() {
    fetch('/api/sectionItems')
      .then(response => response.json())
      .then(data => setSectionItems(data));
  }, []);

  const onDelete = function(sectionItem) {
    if (window.confirm(`Are you sure you wish to delete "${sectionItem.title}"?`)) {
      Api.sectionItems.delete(sectionItem.id)
        .then(() => {
          const newSectionItems = sectionItems.filter(si => si.id !== sectionItem.id);
          setSectionItems(newSectionItems);
        });
    }
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-4">
          <img className="img-fluid mb-3" src={me} alt="My Name" />
          <h1>My Name</h1>
          <p>Something about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="col-md-7 offset-md-1">
          <h2>Education</h2>
          <ul id="education">
            {sectionItems.filter(si => si.Section.slug === 'education').map(si => (
              <li key={si.id}>
                <h3>{si.title}</h3>
                <h4>{si.subtitle}</h4>
                <h5>{si.place}</h5>
                <h6>{si.startedAt} to {si.endedAt ? si.endedAt : 'Present'}</h6>
                <p>{si.about}</p>
                {user && (
                  <p>
                    <Link className="btn btn-sm btn-outline-primary" to={`/sectionItems/${si.id}/edit`}>Edit</Link>&nbsp;
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(si)} type="button">Delete</button>
                  </p>
                )}
              </li>
            ))}
          </ul>
          <h2>Work Experience</h2>
          <ul id="work">        
            {sectionItems.filter(si => si.Section.slug === 'work').map(si => (
              <li key={si.id}>
                <h3>{si.title}</h3>
                <h4>{si.subtitle}</h4>
                <h5>{si.place}</h5>
                <h6>{si.startedAt} to {si.endedAt ? si.endedAt : 'Present'}</h6>
                <p>{si.about}</p>
                {user && (
                  <p>
                    <Link className="btn btn-sm btn-outline-primary" to={`/sectionItems/${si.id}/edit`}>Edit</Link>&nbsp;
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(si)} type="button">Delete</button>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>    
  );
}

export default Home;
