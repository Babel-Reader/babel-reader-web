import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let languageList = [
  {
    key: 'auto',
    name: 'auto detect',
    nativeName: 'auto detect',
  },
  {
    key: 'en',
    name: 'English',
    nativeName: 'English',
  },

  {
    key: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    key: 'es',
    name: 'Spanish',
    nativeName: 'Español',
  },
];

export const getLanguageList = () => {
  return languageList;
};

function App() {
  fetch(
    'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0'
  )
    .then((res) => res.json())
    .then((res) => {
      if (res && res.translation) {
        languageList = [
          languageList[0],
          res.translation['en'],
          res.translation['es'],
          res.translation['fr'],
        ];
        Object.keys(res.translation).forEach((key) => {
          if (key !== 'en' && key !== 'fr' && key !== 'es') {
            languageList.push({
              key,
              name: res.translation[key].name,
              nativeName: res.translation[key].nativeName,
            });
          }
        });
      }
    });

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
