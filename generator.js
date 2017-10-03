var inquirer = require("inquirer");
var BasicCard = require("./basic.js");
var ClozeCard = require("./cloze.js");
var easyData = require('./basic.json');
var hardData = require("./cloze.json");
var card;
var cardArray = [];
var initialIndex = 0;

function userChoice(){

	inquirer.prompt([
	{
		type: 'list',
		message: 'Easy or Difficult?',
		choices: ['Easy', 'Difficult'],
		name: 'choice'
	}

	]).then(function(response){

		if(response.choice === 'Easy'){
			easyMode();
		} 

		else{
			hardMode();
		}
	})
}

function easyMode (){

	for (var i = 0; i < easyData.length; i++) {
		card = new BasicCard(easyData[i].front, easyData[i].back);
		cardArray.push(card);
	}

	question( cardArray, initialIndex);
}

function hardMode (){

	for (var i = 0; i < hardData.length; i++) {
		card = new ClozeCard(hardData[i].text, hardData[i].cloze);
		cardArray.push(card);
	}

	question2( cardArray, initialIndex);
}

var question = function(arr, index) {

	if (index < 5) {
		inquirer.prompt([
		{
			message: arr[index].front,
			name:"question",
			type: "input"
		}
		]).then(function(response){
			if (response.question === arr[index].back) {
				console.log("correct")
				index++;
			} 

			else {
				console.log('wrong');
				index++;
			}

			question(arr, index);

		})
	}

};

var question2 = function(arr, index) {

	if (index < 5 ) {
		inquirer.prompt([
		{
			message: arr[index].partial,
			name: "question",
			type: "input" 
		}

		]).then(function(response){

			if (response.question === arr[index].cloze){
				console.log("correct");
				console.log(arr[index].text);
				index++;
			} 

			else { 
				console.log("wrong");
				console.log(arr[index].text);
				index++; 
			}

			question2(arr, index);

		})
		
	}
}

userChoice();