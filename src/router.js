import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import IndexPage from './routes/IndexPage';

import Apps from './routes/Apps.js';
import AppInfo from "./routes/AppInfo.js";
import AppEdit from "./routes/AppEdit.js";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="Home" component={IndexPage}>
        <IndexRoute component={Apps}/>
        <Route path="app/:id" breadcrumbName="app :id" component={AppInfo}>
          <Route path="edit" breadcrumbName="edit" component={AppEdit}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
