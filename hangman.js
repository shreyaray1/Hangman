var words = new Array();
words[0]= "answer";
words[1]= "peanut";
words[2]= "switch";
words[3]= "excuse";
words[4]= "taught";
words[5]= "enough";
words[6]= "bottom";
words[7]= "turtle";
words[8] = "pencil";
words[9] = "circus";
words[10] = "cavern";
words[11] = "return";
words[12] = "during";
words[13] = "awhile";
words[14] = "caught";
words[15] = "doctor";
words[16] = "minute";
words[17] = "except";
words[18] = "python";
words[19] = "glitch";
words[20] = "fright";
words[21] = "actual";
words[22] = "avenue";
words[23] = "behalf";
words[24] = "branch";
words[25] = "castle";
words[26] = "driven";
words[27] = "island";
words[28] = "partly";
words[29] = "planet";
words[30] = "reward";
words[31] = "prison";
words[32] = "notion";
words[33] = "master";
words[34] = "listen";
words[35] = "liquid";
words[36] = "honest";
words[37] = "gather";
words[38] = "forget";
words[39] = "vendor";


var def = new Array ();
def[0]= "a thing said, written, or done to deal with or as a reaction to a question, statement, or situation";
def[1]= "the oval seed of a South American plant, widely roasted and salted and eaten as a snack";
def[2]= "change the position, direction, or focus of";
def[3]= "attempt to lessen the blame attaching to (a fault or offense); seek to defend or justify";
def[4]= "show or explain to (someone) how to do something";
def[5]= "as much or as many as required";
def[6]= "the lowest point or part of something";
def[7]= "a slow-moving reptile, enclosed in a scaly or leathery domed shell into which it can retract its head and thick legs";
def[8] = "an instrument for writing or drawing, consisting of a thin stick of graphite";
def[9] = "a traveling company of acrobats, clowns, and other entertainers which give performances";
def[10] = "a cave, or a chamber in a cave, typically a large one";
def[11] = "come back or go to a place or person";
def[12] = "throughout the course or duration of a period of time";
def[13] = "for a short time";
def[14] = "intercept and hold something which has been thrown or dropped";
def[15] = "someone who has practiced medicine";
def[16] = "a period of time equal to sixty seconds";
def[17] = "not including; other than";
def[18] = "a large non-venomous snake; a high-level programming language";
def[19] = "a sudden, usually temporary malfunction of equipment";
def[20] = "a sudden intense feeling of fear";
def[21] = "existing in reality and not potential, possible, simulated, or false";
def[22] = "a broad street, often lined with trees";
def[23] = "for the benefit of; in the interest of";
def[24] = "a woody stem or limb growing from the trunk of a tree or shrub";
def[25] = "a large fortified building or group of buildings with thick walls, usually dominating the surrounding country.";
def[26] = "motivated by or having a compulsive quality or need";
def[27] = "a landmass, especially one smaller than a continent, entirely surrounded by water";
def[28] = "in part or in some degree; not completely";
def[29] = "a celestial body larger than an asteroid or a comet; revolves around the sun";
def[30] = "the return for performance of a desired behavior; positive reinforcement";
def[31] = "a place for the confinement and punishment of prisoners";
def[32] = "a belief or opinion";
def[33] = "one that has control over another person, a group of persons, or a thing";
def[34] = "to make an effort to hear something";
def[35] = "a state of matter which has a fixed volume; ex: water";
def[36] = "not deceptive; displaying integrity; genuine";
def[37] = "to collect from different places; assemble";
def[38] = "to be unable to remember something";
def[39] = "one that sells or vends something";

var wordsIndex = 0; // randomly generated index of word being played
var word = ""; // the value of the array at index wordsIndex
var count = 0; // the amount of correct letters the user has guessed
var man = 0; // the amount of incorrect letters the user has guessed
var totalCount = 0; // the total amount of letters guessed
var clicked = false; // boolean value for whether the word has been generated

var tries = new Array (); // array with all letters that have already been guessed

/** This function is used to read in the keyboard input. When read in, 
 * the letters read as "Key" + the letter name, substring is used to cut it off.
 * The loop is to ensure no repeated letters were checked. In the if 
 * statement at the bottom, the letter length needs to be 1 (to make 
 * sure its an alphabetic character), it cannot be a repeated letter, and
 * the green generate word button has to be clicked.
*/
document.addEventListener("keyup", function (event) {
	let letter = ((event.code).substring(3)).toLowerCase();
	let repeat = false; 
	for(let i = 0; i < tries.length; i++)
	{
		if(letter == tries[i])
			repeat = true;
	}
	if(letter.length == 1 && !repeat && clicked)
		checkLetter(letter);
});

/** This function is used to generate the word and make sure there are
 * no repeated words in a single game session. First the function initializes
 * the local storage if there is nothing in it. Then in the else it checks how 
 * many indices have been used in the storage. If all words have been played
 * it takes the user back to the index page, and otherwise it randomly generates
 * an index in a loop until it gets one the user hasn't played with yet.
*/
function makeWords()
{
	if (window.localStorage.getItem("wordsDone") === null )
			wordsIndex = Math.floor(Math.random() * words.length);
	else
	{
		wordsIndex = Math.floor(Math.random() * words.length);
		let length = window.localStorage.getItem("wordsDone").split(" ").length - 1;
		if (length != words.length) 
		{
			while(window.localStorage.getItem("wordsDone").includes(wordsIndex))
				wordsIndex = Math.floor(Math.random() * words.length);
		} 
		else
		{
			alert("You've completed the game! Start over?");
			goToNextPage('index.html');
		}
	}
	wordsDone();
	word = words[wordsIndex];
}

/** This function calls makeWords to generate the word, and then it prints the
 * underscores on the screen and makes the wrong letters area. This method
 * is called when the generate words button is clicked.
*/
function getWords()
{
	makeWords();
	if (window.localStorage.getItem("wordIndex") === null )
		window.localStorage.setItem("wordIndex", wordsIndex)
	let output = "";
	for(let i = 0; i < 6; i++)
		output += "__ ";
	document.getElementById("result").innerHTML = output;
	document.getElementById("wrong-letters").innerHTML = "Wrong Letters:";
	clicked = true;
	//https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
	document.getElementById("words").disabled = true;
}

/** This function takes in a parameter (where the program has to go next), and 
 * switches the page to that given parameter.
*/
function goToNextPage(nextPage)
{
	location.replace(nextPage);
}

/** This function is called from the win or lose page and it uses local storage to find
 * the wordsIndex the user played with on the previous page and print the word and
 * definition to the screen.
*/ 
function findWord()
{
	let pass = window.localStorage.getItem("wordIndex");
	document.getElementById("correct-word").innerHTML = words[pass] + ": " + def[pass];
	window.localStorage.removeItem("wordIndex");
}

/** This function is used to add whatever wordsIndex the user just played with to the
 * local storage.
*/
function wordsDone()
{
	if (window.localStorage.getItem("wordsDone") === null )
		window.localStorage.setItem("wordsDone", wordsIndex + " ");
	else
	{
		let newStore = window.localStorage.getItem("wordsDone") + wordsIndex + " ";
		window.localStorage.setItem("wordsDone", newStore);
	}
}

/** This function takes in a parameter from the event listener (the letter the user inputted)
 * and checks if the letter is right or wrong. If it's right, it replaces its appropriate underscore
 * on the screen and adds one to count. If its wrong it prints the letter in the wrong box and 
 * adds one to man. Each number added to man prints a new body part of the man on the 
 * screen
*/
function checkLetter(letter)
{
	let correct = false; // determines whether the letter is right or wrong
	let result = ""; // gets the result, adds the correctly guessed letter, returns new value
	for(let i = 0; i < 6; i++)
	{
		if(letter == word.charAt(i))
		{
			result = document.getElementById("result").innerHTML;
			result = result.substring(0, i*3) + " " + letter + " " + result.substring((i+1)*3);
			document.getElementById("result").innerHTML = result;
			correct = true;
			count++;
		}
	}
	if(!correct)
	{
		man++;
		document.getElementById("wrong").innerHTML += letter + " ";
	}
	if(man == 1)
	{
		//https://softauthor.com/javascript-working-with-images/
		const img = document.createElement("img");
		img.src = "circle.png";
		img.id = "circle";
		document.body.appendChild(img);
	}
	if(man == 2)
	{
		const img = document.createElement("img");
		img.src = "vertline.png";
		img.id = "torso";
		document.body.appendChild(img);
	}
	if(man == 3)
	{
		const img = document.createElement("img");
		img.src = "horizline.png";
		img.id = "arm";
		document.body.appendChild(img);
	}
	if(man == 4)
	{
		const img = document.createElement("img");
		img.src = "horizline.png";
		img.id = "arm2";
		document.body.appendChild(img);
	}
	if(man == 5)
	{
		const img = document.createElement("img");
		img.src = "diagline.png";
		img.id = "leg";
		document.body.appendChild(img);
	}
	if(man == 6)
	{
		const img = document.createElement("img");
		img.src = "diagline2.png";
		img.id = "leg2";
		document.body.appendChild(img);
		goToNextPage('lose.html');
	}
	if(count == 6)
		goToNextPage('win.html');
		
	totalCount++;
	tries[totalCount] = letter;
}

/** When the user gets taken to win.html, it adds one to the win value
 * to be used on the stats page. It is stored in local storage. 
*/
function addWin()
{
	if((window.location.href).includes('win.html'))
	{
		initalizeWinLose();
		let wins = window.localStorage.getItem("winValue");
		wins++;
		window.localStorage.setItem("winValue", wins);
	}
}

/// Same thing but with lose.html
function addLose()
{
	if((window.location.href).includes('lose.html'))
	{
		initalizeWinLose();
		let losses = window.localStorage.getItem("loseValue");
		losses++;
		window.localStorage.setItem("loseValue", losses);
	}
}

/// Initializes the local storage for the win stats and the lose stats
function initalizeWinLose()
{
	if (window.localStorage.getItem("winValue") === null )
		window.localStorage.setItem("winValue", 0)
	if (window.localStorage.getItem("loseValue") === null )
		window.localStorage.setItem("loseValue", 0)
}

/// Called from stats.html, prints out number of wins and losses from localStorage
function getStats()
{
	document.getElementById("num-of-wins").innerHTML = window.localStorage.getItem("winValue");
	document.getElementById("num-of-losses").innerHTML = window.localStorage.getItem("loseValue");
}

/// resets local storage when the user is at index.html
function reset()
{
	if((window.location.href).includes('index.html'))
		window.localStorage.clear();
}

addWin();
addLose();
reset();
