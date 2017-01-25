#!/usr/bin/env node

var fs = require('fs'),
argv = require('yargs').argv,
Handlebars = require('handlebars'),
geolib = require('geolib'),
BODY = fs.readFileSync('./BODY.xml');
PLACEMARK = fs.readFileSync('./PLACEMARK.xml'),
TPL_BODY = Handlebars.compile(BODY.toString()),
coordsRex = /<coordinates>((.|\n)*)<\/coordinates>/;
Handlebars.registerPartial('placemark',PLACEMARK.toString()),
placemarks = [],
coordinates = [];

const STEP_SIZE = argv.step || 0.02,
INPUT_FILENAME = argv.input || argv._,
OUTPUT_FILENAME = argv.output || 'tour.kml';

var inputFile;
try{
  inputFile = fs.readFileSync(INPUT_FILENAME).toString();  
}catch(err){
  console.log('Error reading input file with path ' + inputFile);
  console.log(err);
}

var match = inputFile.match(coordsRex);
if (!match || match.length !== 3){
  return new Error('Sorry - <coordinates></coordinates> tag pair not reliably identified!')
}
var coords = match[1].trim().split(' ');
console.log("Working off " + coords.length + " coords");
for (var i=0; i<coords.length; i++){
  var c = coords[i].split(','),
  a = c,
  b = c; // only happens for the very last element
  if (i !== coords.length-1){
    // set the finish point of this path segment to the next in the array
    b = coords[i+1].split(',');
  }
  a = { latitude : a[0], longitude : a[1], altitude : a[2]};
  b = { latitude : b[0], longitude : b[1], altitude : b[2]};
  coordinates.push(a);
  placemarks.push({
    start : a,
    finish : b
  });
}

var center  = geolib.getCenter(coordinates),
distance = geolib.getDistance(coordinates[0], coordinates[coordinates.length-1]);

fs.writeFileSync(OUTPUT_FILENAME, TPL_BODY({
  start : {
    latitude : center.latitude,
    longitude : center.longitude,
    altitude : 0,
    heading : 0,
    tilt : 0,
    range : distance
  },
  stepSize : STEP_SIZE,
  placemarks : placemarks
}));
console.log('Wrote ' + OUTPUT_FILENAME);
