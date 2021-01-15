import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {StatusCodes} from 'http-status-codes';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';
import SectionItemForm from './SectionItemForm';

function NewSectionItem() {
  const history = useHistory();
  const [error, setError] = useState([]);
  const [sectionItem, setSectionItem] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(function() {
    const search = new URLSearchParams(history.location.search);
    const sectionSlug = search.get('section') || 'education';
    Api.sections.index().then(response => {
      setSections(response.data);
      const section = response.data.find(s => s.slug === sectionSlug) || response.data[0];
      const newSectionItem = {
        SectionId: section.id,
        title: '',
        subtitle: '',
        place: '',
        about: '',
        startedAt: '',
        endedAt: ''
      }
      setSectionItem(newSectionItem);
    });
  }, [history.location.search]);

  const onChange = function(event) {
    const newSectionItem = {...sectionItem};
    newSectionItem[event.target.name] = event.target.value;
    setSectionItem(newSectionItem);
  };

  const onSubmit = async function(event) {
    event.preventDefault();
    setError(null);
    try {
      await Api.sectionItems.create(sectionItem);
      history.push('/');
    } catch (error) {
      if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setError(new ValidationError(error.response.data));
      } else {
        setError(new UnexpectedError());
      }
    }
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">New Section Item</h2>
              {sectionItem && (
                <form onSubmit={onSubmit}>
                  <SectionItemForm error={error} onChange={onChange} sections={sections} sectionItem={sectionItem} />
                  <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Submit</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NewSectionItem;
