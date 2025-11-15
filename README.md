# How it currently works

## manifest.json
Injects content.js when the document is loading/starting

## content.js
Injects a js file `injectTest.js` into chrome tab

## future plan
N/A

## Current goal
* setup api to get and post
* setup api backend to start parsing post after new addition
* setup api to look for sensitive data then updated row with indexes and content that should be sensored
* have script look for those updated rows (have dirty bits)
* have script have a local cache of sensitive content to have a faster turnaround time (will need to go more indepth with this)
