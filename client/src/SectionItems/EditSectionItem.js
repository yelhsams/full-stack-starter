import {useEffect, useState} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import classNames from 'classnames';

import Api from '../Api';

function EditSectionItem() {
  const history = useHistory();
  const {token} = useParams();

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Edit Section Item</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditSectionItem;
