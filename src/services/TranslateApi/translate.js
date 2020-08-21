const Http = new XMLHttpRequest();
const url = process.env.REACT_APP_TRANSLATE_URL;

export default (text, params, callback) => {
  const inLang = params.inLang.key === 'auto' ? '' : params.inLang.key;
  const outLang = params.outLang.key;
  const pathParams = `outLang=${outLang}&inLang=${inLang}`;

  Http.open('POST', `${url}?${pathParams}`, true);

  Http.onloadend = () => {
    callback(Http.responseText);
  };
  Http.send(text);
};
