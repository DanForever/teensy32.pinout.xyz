"use strict";

function populateInterfaces(sourceXml)
{
	// The source data to populate from
	var features = sourceXml.getElementsByTagName("features")[0];
	
	var interfaces = document.getElementById("interfaces");
	
	for(var feature of features.children)
	{
		var name = feature.localName;
		
		var li = document.createElement("li");
		li.className = name;
		
		var cb = document.createElement("input");
		cb.setAttribute("type", "checkbox");
		cb.setAttribute("name", name);
		cb.setAttribute("id", name);
		cb.checked = true;
		cb.onchange = interface_on_change;
		
		var label = document.createElement("label");
		label.setAttribute("for", name);
		label.innerHTML = name;
		
		li.appendChild(cb);
		li.appendChild(label);
		interfaces.appendChild(li);
	}
}

function populateTable(sourceXml, side)
{
	// the html table we'll be populating
	var targetTable = document.getElementById(`${side}-pins`);
	
	// The source data to populate from
	var pins = sourceXml.getElementsByTagName(side)[0];
	
	for(var pin of pins.children)
	{
		var row = targetTable.insertRow(-1);
		row.setAttribute("aria-label", pin.getAttribute("aria-label"))
		
		for(var feature of pin.children)
		{
			var cell = row.insertCell(-1);
			cell.className = feature.localName;
			cell.innerHTML = feature.innerHTML;
		}
	}
}

// Load the source xml
var pindata = document.getElementById('pindata').innerHTML;
var parser = new DOMParser();
var pinxml = parser.parseFromString(pindata, "text/xml");

populateInterfaces(pinxml);
populateTable(pinxml, "left");
populateTable(pinxml, "right");