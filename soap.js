
//OS BLOCOS COMENTADOS DO INICIO E FINAL SÃO O APONTAMENTE PARA O PROXY (FIDDLER) - DESCOMENTAR PARA PEGAR AS REQUISIÇÕES NO FIDDLER

/*
process.env.http_proxy = "http://127.0.0.1:8888";
process.env.https_proxy = "http://127.0.0.1:8888";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
*/

var Axios = require('axios');
var parseString = require('xml2js').parseString;

Axios.defaults.headers.post['Content-Type'] = 'text/xml; charset=utf-8'

//PRIMEIRO METODO SOAP - Multiplicação de dois números
let headers = {
  'SOAPAction': 'http://tempuri.org/Multiply',
}

let data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Multiply xmlns="http://tempuri.org/">
      <intA>5</intA>
      <intB>2</intB>
    </Multiply>
  </soap:Body>
</soap:Envelope>`

Axios.post('http://www.dneonline.com/calculator.asmx', data, { headers })
  .then(function (response) {
    let responseStringXML = response.data;
    parseString(responseStringXML, function (err, result) {
      let responseJSON = JSON.parse(JSON.stringify(result));
      console.dir("O resultado da multiplicação é: "+responseJSON['soap:Envelope']['soap:Body'][0].MultiplyResponse[0].MultiplyResult[0]);
    });  
  })
  .catch(function (error) {
    console.log(error);
  })

//SEGUNDO METODO SOAP - Adição de dois números
headers = {
  'SOAPAction': 'http://tempuri.org/Add',
}
  
data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>5</intA>
      <intB>2</intB>
    </Add>
  </soap:Body>
</soap:Envelope>`
  
Axios.post('http://www.dneonline.com/calculator.asmx', data, { headers })
  .then(function (response) {
    let responseStringXML = response.data;
    parseString(responseStringXML, function (err, result) {
      let responseJSON = JSON.parse(JSON.stringify(result));
      console.dir("O resultado da adição é: "+responseJSON['soap:Envelope']['soap:Body'][0].AddResponse[0].AddResult[0]);
    });  
  })
  .catch(function (error) {
    console.log(error);
  })

//TERCEIRO METODO SOAP - Subtração de dois números
headers = {
  'SOAPAction': 'http://tempuri.org/Subtract',
}
    
data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Subtract xmlns="http://tempuri.org/">
      <intA>5</intA>
        <intB>2</intB>
    </Subtract>
  </soap:Body>
</soap:Envelope>`
    
Axios.post('http://www.dneonline.com/calculator.asmx', data, { headers })
  .then(function (response) {
    let responseStringXML = response.data;
    parseString(responseStringXML, function (err, result) {
      let responseJSON = JSON.parse(JSON.stringify(result));
      console.dir("O resultado da subtração é: "+responseJSON['soap:Envelope']['soap:Body'][0].SubtractResponse[0].SubtractResult[0]);
    });  
  })
  .catch(function (error) {
    console.log(error);
  })


//OUTRO WEBSERVICE PRIMEIRO METODO SOAP - retorna informações de um país pelo seu código
data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
      <sCountryISOCode>BR</sCountryISOCode>
    </FullCountryInfo>
  </soap:Body>
</soap:Envelope>`

Axios.post('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', data)
  .then(function (response) {
    let responseStringXML = response.data;
    parseString(responseStringXML, function (err, result) {
      let responseJSON = JSON.parse(JSON.stringify(result));
      console.dir("As informações do Brasil são:");
      console.dir(responseJSON['soap:Envelope']['soap:Body'][0]['m:FullCountryInfoResponse'][0]['m:FullCountryInfoResult'][0], {depth: null});
    });
  })
  .catch(function (error) {
    console.log(error);
  })
  
//OUTRO WEBSERVICE SEGUNDO METODO SOAP - retorna a capital de um país pelo seu código
data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
      <sCountryISOCode>BR</sCountryISOCode>
    </CapitalCity>
  </soap:Body>
</soap:Envelope>`

Axios.post('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', data)
  .then(function (response) {
    let responseStringXML = response.data;
    parseString(responseStringXML, function (err, result) {
      let responseJSON = JSON.parse(JSON.stringify(result));
      console.dir("A capital do Brasil é: "+responseJSON['soap:Envelope']['soap:Body'][0]['m:CapitalCityResponse'][0]['m:CapitalCityResult'][0]);
    });
  })
  .catch(function (error) {
    console.log(error);
  })

/*
process.env.http_proxy = "";
process.env.https_proxy = "";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "";
*/

