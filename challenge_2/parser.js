/*The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `children`.
*/

var flatten = (obj) => {

  var result = [];
  var recurse = (obj) => {
    result.push(obj);
  
    for (var key in obj) {
      if (key === 'children') {
        for (var i = 0; i < obj[key].length; i++) {
          recurse(obj[key][i]);
        }
        delete obj[key];
      } 
    }
  
  }
  recurse(obj);
  return result;
}

var createCSV = (array) => {

  var createHeader = (array) => {
    var header = Object.keys(array[0]).join(",")
    header += "<br>";
    return header;
  }

  var createData = (array) => {
    var data = "";
    for (var i = 0; i < array.length; i++){
      var values = Object.values(array[i]).join(",");
      data += values + "<br>";
    }
    return data;
  }
  return createHeader(array) + createData(array);
}


var HTTPsify = (string) => {
  return (`<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<h1>CSV Report Generator</h1>
<h3>Put JSON data in the form and submit when you are ready</h3>
<form action="/" method="post" >
  <input type="file" name="json">
  <button id="submitButton">Submit</button>
</form>
<p id="csv">${string}</p>
<script src="app.js"></script>
</body>
</html>`)
};

module.exports.flatten = flatten;
module.exports.createCSV = createCSV;
module.exports.HTTPsify = HTTPsify;