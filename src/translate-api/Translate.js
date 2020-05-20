
const Http = new XMLHttpRequest();
const url='https://us-central1-babel-reader-web.cloudfunctions.net/translate';//todo: use env var


export default (text, callback)=>{
  const params = "outLang=fr"

  Http.open("POST", `${url}?${params}`, true);

  Http.onloadend = ()=>{
    callback(Http.responseText);
  }
  Http.send(text);
}
