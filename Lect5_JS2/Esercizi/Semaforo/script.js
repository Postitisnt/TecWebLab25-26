let position = 0;
const lightArray = ['green','yellow','red']; // lightArr[1] -> yellow

const change = () => {
	let lights = document.getElementsByClassName('light');
	//let position = 0;
	// lights [<div id="green" class="light"></div>, <div class="light"></div>, <div class="light"></div>]
	lights.item(0).removeAttribute('id');
	lights.item(1).removeAttribute('id');
	lights.item(2).removeAttribute('id');
	// lights [<div class="light"></div>, <div class="light"></div>, <div class="light"></div>]
	
	position += 1;
	// let position = 1
	console.log("Value POSITION: ", position)
	console.log(lights.item(position))
	
	if (position >= 3)
		position = 0
	
	lights.item(position).setAttribute('id',lightArray[position]);
	// lights [<div class="light"></div>, <div id= "yellow" class="light"></div>, <div class="light"></div>]
}