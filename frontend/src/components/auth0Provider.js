import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { IDKitWidget } from "@worldcoin/idkit";
import App from './App';

// Require the js-yaml library
const yaml = require('js-yaml');
// Require the fs (file system) module to read the file
const fs = require('fs');
const root = createRoot(document.getElementById('root'));

// Read the YAML file
const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));


root.render(
<Auth0Provider
    domain={config.AUTH0.domain}
    clientId={config.AUTH0.clientId}
    authorizationParams={{
      redirect_uri: 'https://www.google.ca'
    }}
  >
    <App />
  </Auth0Provider>,
);