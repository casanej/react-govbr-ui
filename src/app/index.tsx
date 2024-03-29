import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

library.add(fas, fab);

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,
    document.getElementById('root')
);
