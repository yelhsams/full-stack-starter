import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {StatusCodes} from 'http-status-codes';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';
import SectionItemForm from './SectionItemForm';

function EditSectionItem() {
  const {id} = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [sectionItem, setSectionItem] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(function() {
    Api.sections.index().then(response => setSections(response.data));
    Api.sectionItems.get(id).then(response => setSectionItem(response.data));
  }, [id]);
  
  const onChange = function(event) {
    const newSectionItem = {...sectionItem};
    newSectionItem[event.target.name] = event.target.value;
    setSectionItem(newSectionItem);
  };

  const onSubmit = async function(event) {
    event.preventDefault();
    setError(null);
    try {
      await Api.sectionItems.update(id, sectionItem);
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
              <h2 className="card-title">Edit Section Item</h2>
              {sectionItem && (
                <form onSubmit={onSubmit}>
                  <SectionItemForm error={error} onChange={onChange} sections={sections} sectionItem={sectionItem} />
                  <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Update</button>
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

export default EditSectionItem;
