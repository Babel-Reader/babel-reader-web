import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/home/Home';
import { pdfjs } from 'react-pdf';
import Library from './components/pages/library';
import { bookTitle } from 'utils';
import { auth } from 'services/firebase/firebase';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const LANG_AUTO = {
  key: '??',
  name: 'auto detect',
  nativeName: 'auto detect',
};

let languageList = [
  LANG_AUTO,
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

const fetchLanguageList = () => {
  return fetch(process.env.REACT_APP_TRANSLATE_LANGUAGE_LIST_URL)
    .then((res) => res.json())
    .then((res) => {
      if (res && res.translation) {
        const langValueForKey = (key) => {
          return {
            key,
            name: res.translation[key].name,
            nativeName: res.translation[key].nativeName,
          };
        };

        languageList = [
          LANG_AUTO,
          langValueForKey('en'),
          langValueForKey('fr'),
          langValueForKey('es'),
        ];
        Object.keys(res.translation).forEach((key) => {
          if (key !== 'en' && key !== 'fr' && key !== 'es') {
            languageList.push(langValueForKey(key));
          }
        });
      }
    });
};

export const BookContext = React.createContext({});

function App() {
  const [file, setFile] = useState();
  const [user, setUser] = useState(auth.currentUser);
  const [languages, setLanguages] = useState({
    in: LANG_AUTO,
    out: languageList[2],
  });

  useEffect(() => {
    const title = bookTitle(file);
    const pageTitle = 'Babel Reader';
    document.title = title ? `${pageTitle}: ${title}` : pageTitle;
  }, [file]);

  useEffect(() => {
    fetchLanguageList().then(() => {
      setLanguages({
        in: LANG_AUTO,
        out: languageList[2],
      });
    });
  }, []);

  return (
    <BookContext.Provider
      value={{
        file,
        setFile,
        languages,
        setLanguages,
        languageList,
        user,
        setUser,
      }}
    >
      <Router>
        <Switch>
          <Route path="/reading/samples/:bookName">
            <Home isSample />
          </Route>
          <Route path="/reading/:bookName">
            <Home />
          </Route>
          <Route>
            <Library />
          </Route>
        </Switch>
      </Router>
    </BookContext.Provider>
  );
}

export default App;
