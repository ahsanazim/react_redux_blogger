import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app.js';
import Index from './containers/index.js';
import Show from './containers/show.js';
import New from './containers/new.js';
import SignInUp from './containers/SignInUp.js';
import RequireAuth from './containers/require-auth.js';


export default(
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="posts/new" component={RequireAuth(New)} />
    <Route path="posts/:id" component={Show} />
    <Route path="/signinup" component={SignInUp} />
  </Route>
);
