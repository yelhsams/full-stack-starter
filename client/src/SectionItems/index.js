import {useRouteMatch, Redirect, Route, Switch} from 'react-router-dom';

import EditSectionItem from './EditSectionItem';
import NewSectionItem from './NewSectionItem';

function SectionItems() {
  const {path, url} = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to="/" />
      </Route>
      <Route path={`${path}/new`}>
        <NewSectionItem />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <EditSectionItem />
      </Route>
    </Switch>
  );
}

export default SectionItems;
