import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';

const { name, namespace } = require('../package.json');
const App = ({ namespace }) => {
  return (
    <div>
      <div>
        welcome to core
      </div>
      <Router basename={`${namespace}/`} />
    </div>
  );
}

export default (id, namespace = '') => {
  ReactDOM.render(<App namespace={namespace} />, document.getElementById(id || name));
};