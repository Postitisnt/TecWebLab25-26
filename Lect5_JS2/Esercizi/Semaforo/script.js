let position = 0;
const lightArray = ['green','yellow','red'];

const change = () => {
	let lights = document.getElementsByClassName('light');
	lights.item(0).removeAttribute('id');
	lights.item(1).removeAttribute('id');
	lights.item(2).removeAttribute('id');
	
	position += 1;
	console.log("Value POSITION: ", position)
	console.log(lights.item(position))
	
	if (position >= 3)
		position = 0
	
	lights.item(position).setAttribute('id',lightArray[position]);
}