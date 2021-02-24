import { Switch, Route, useRouteMatch } from "react-router-dom";

import SectionsList from './SectionsList';
import SectionForm from './SectionForm';

function Sections(){
    //from reactRouterDOM, nested Route to reference existing path
    //read, index
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path = {path}>
                <SectionsList />
            </Route>
            <Route path = {`${path}/new`}>
                <SectionForm />
            </Route>
            <Route path = {`${path}/:id/edit`}>
                <SectionForm />
            </Route>
        </Switch>
    );
}

export default Sections;