import { Switch, Route, useRouteMatch } from "react-router-dom";

import SectionsList from './SectionsList';

function Sections(){
    //from reactRouterDOM, nested Route to reference existing path
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path = {path}>
                <SectionsList />
            </Route>
            <Route path = {`${path}/new`}>

            </Route>

        </Switch>
    );
}

export default Sections;