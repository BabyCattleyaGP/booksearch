/*
Demonstrating use of a single query to populate a # Virtuoso Quad Store via Javascript. 
*/

/* 
HTTP URL is constructed accordingly with JSON query results format as the default via mime type.
*/

function sparqlQuery(query, baseURL, format) {
	if(!format)
		format="application/json";
	var params={
		"default-graph": "", "should-sponge": "soft", "query": query,
		"debug": "on", "timeout": "", "format": format,
		"save": "display", "fname": ""
	};
	
	var querypart="";
	for(var k in params) {
		querypart+=k+"="+encodeURIComponent(params[k])+"&";
	}
	var queryURL=baseURL + '?' + querypart;
	if (window.XMLHttpRequest) {
  	xmlhttp=new XMLHttpRequest();
  }
  else {
  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET",queryURL,false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}

/*
setting Data Source Name (DSN)
*/

var dsn="http://dbpedia.org/resource/DBpedia";

/*
Virtuoso pragma "DEFINE get:soft "replace" instructs Virtuoso SPARQL engine to perform an HTTP GET using the IRI in FROM clause as Data Source URL with regards to 
DBMS record inserts
*/

var query="DEFINE get:soft \"replace\"\nSELECT DISTINCT * FROM <"+dsn+"> WHERE {?s ?p ?o}"; 
var data=sparqlQuery(query, "/sparql/");