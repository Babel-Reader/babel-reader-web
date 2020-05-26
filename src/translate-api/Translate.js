
const Http = new XMLHttpRequest();
const url='https://us-central1-babel-reader-web.cloudfunctions.net/translate';//todo: use env var


export default (text,params, callback)=>{
  const {inLang='', outLang='en'} = params
  const pathParams = `outLang=${outLang}&inLang=${inLang}`

  Http.open("POST", `${url}?${pathParams}`, true);

  Http.onloadend = ()=>{
    callback(Http.responseText);
  }
  Http.send(text);
}
