# Tourify  - Converts Google Earth Path KML files to Tours
Google Earth is a fantastically powerful product that Google has alas forgot. The KML markdown syntax provides a way to animate a path, but it isn't easy - it's a painful manaul process.  
This tool builds off [this great work](https://sites.google.com/site/kmltouring/animating-a-line) to allow the input of a Google Earth Path KML file, and in return receive a tour KML file back.  
It looks for a single `<coordinates>` entry with space-separated coords. Means you can draw a path in Google Earth, export to KML, use this tool to generate a tour, then animate this path. 

## Usage  

###Install
    
    npm install -g tourify
    
###Simple input
    
    tourify --input=examples/input.kml
    # will output a new kml file "tour.kml"
    
###CLI Options
Not many right now - but you can specify the step size (aka speed). 
    
    tourify --step=0.01 --input=examples/input.kml --output=mytour.kml
    
