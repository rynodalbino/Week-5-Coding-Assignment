/* 1.	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
a.	Use at least one array.
b.	Use at least two classes.
c.	Your menu should have the options to create, view, and delete elements.
*/
//Creating a Menu2 for Player Characters to create a Race in Dungeons and Dragons as well as add a class to their Player Character.
//
class PlayerCharacter {
    constructor(name, playerClass) {
        this.name = name;
        this.playerClass = playerClass;
    }
//print out character info
    describe() {
        return `${this.name} plays ${this.playerClass}`; //using temperate literals
    }
}
//Now creating the Race class.  

class Race {
    constructor(name) {
        this.name = name;
        //create an array to hold the players per race.
        this.playerCharacters = [];
    }
//create method that allows user to input a characters name.
    addPlayerCharacter(playerCharacter) {
        if (playerCharacter instanceof PlayerCharacter) {
            this.playerCharacters.push(playerCharacter);
        } else {
            //if not a valid character than throw an error message
            throw new Error(`You can only add an instance of a Player Character.`); 
        }
        }

    describe() {
        return `${this.name} has ${this.playerCharacters.length} player characters.`;
    }
}
// create the start menu using a class so user can create, view and delete a race.
class Menu {
    constructor() {
        this.races = []; //empty array to be added to by user input
        this.selectedRace = null; //No teams are selected at the start so it is null for now
    }

    start() { //starts up the menu application
        let selection = this.showMainMenuOptions(); //this method will return what the user selects
        while (selection != 0) {
            //create a switch for if user selects option other than exit
            switch (selection){
                case '1':
                    this.createRace();
                    break;
                case '2':
                    this.viewRace();
                    break;
                case '3':
                    this.deleteRace();
                    break;
                case '4':
                    this.displayRace();
                default:
                    selection = 0; //anything other than 1-4
            }
            selection = this.showMainMenuOptions(); //keep the loop going
        }
        //if user chooses 0
        alert('Goodbye!');
    }
//create a method to display options
    showMainMenuOptions() {
        //create the prompt box 
        //use temperate literals so don't have to concatenate
        return prompt(`
            0) Exit
            1) Create New Playable Race
            2) View Specific Race
            3) Delete Playable Race
            4) Display all Playable Races
            `);
    }

    
//Print out info of user input and show prompt
    showRaceMenuOptions(raceInfo) {
        return prompt(`
            0) Back
            1) Create Player Character
            2) Delete Player Character
            
            ${raceInfo}
            `); //display Race info
    }
    
    displayRace() {
        let raceString = ''; //blank string so it can be built
        for (let i = 0; i < this.races.length; i++) { //for loop to iterate through the races
            raceString += i + ') ' + this.races[i].name + '\n'; //concatenate the index of each race /n will add new line per race
        }
        alert(raceString); //see all the races
    }

    createRace() {
            let name = prompt('Enter name for new Race:');
            this.races.push(new Race(name)); //push the new team into the Race array
        }

    viewRace() { //view Race method to see details.
        let index = prompt('Enter the index of the Race you want to view:'); 
        if (index > -1 && index < this.races.length) { //validate user input so it won't crash if user puts in 0 or something
            this.selectedRace = this.races[index]; 
            let description = 'Race Name: ' + this.selectedRace.name + '\n'; //describes the Race


            for(let i = 0; i < this.selectedRace.playerCharacters.length; i ++) { // for loop that adds the description to each Race from array
                description += i + ') ' + this.selectedRace.playerCharacters[i].name + ' - ' + this.selectedRace.playerCharacters[i].playerClass + '\n';
            } //Lists all the Player Characters of Race

            let selection = this.showRaceMenuOptions(description);
            switch (selection) { //this switch is for sub menu
                case '1':
                    this.createPlayerCharacter(); //create Player Character
                    break;
                case '2':
                    this.deletePlayerCharacter(); //Delete Player Character
            }
        }
    }
    deleteRace() {
        let index = prompt('Enter the index of the Race you wish to delete:'); //finds the race that user inputs
        if (index > -1 && index < this.races.length) { 
            this.races.splice(index, 1); //removes the Race from array
        }
    }
    


    createPlayerCharacter() { //function to allow creating a Player Character
        let name = prompt('Enter new name for new Player Character:'); //Name the PC
        let playerClass = prompt('Enter class for new Player Character:'); //Add class for PC
        this.selectedRace.playerCharacters.push(new PlayerCharacter(name, playerClass)); //Adds the Player Character to array
    }

    deletePlayerCharacter() { //function to allow user to delete Player Character
        let index = prompt('Enter the index of the Player Character you want to delete:'); //finds the PC to delete
        if (index > -1 && index < this.selectedRace.playerCharacters.length) {
            this.selectedRace.playerCharacters.splice(index, 1); // deletes selected PC from array and index
        }
    }
}

let menu = new Menu(); //create an instance of our menu to allow user input
menu.start();