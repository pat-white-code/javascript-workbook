Codeplan for Dodgeball.

Can add People to Players - When clicked the people are added to the Players column and removed from the People list while getting new values of a player added to them.

create a player class:

We have an array of people. We are going to use the data in the people array to turn people into players. 

To do this we are going to create a Player class. the player class should take in the person's information in the constructor (id, name, age, skillSet, placeBorn) and then assign it in the constructor using this. We are going to add properties canThrowBall, isPaid, isHealthy and yearsExperience. the first three will be set to true, and the last will be set to 0


makePlayer function:

We should be able to press a button, to turn a person into a player. So, we are going to make a function that takes in an 'id' which will then find a person and turn that person into a player.

Once that person is a player, we will push the player to the new players array, and splice that person from the people array.

After that we need to update our display of people and players to reflect the change. To do this we will have two functions : listPeopleChoices() and listPlayers();

ListPeopleChoices() function:

this function will find the array of people and create a list in the dom. To do this we will target the element where we will be posting the list using document.getElementById. Then use array map method and for each 'person':
  - create li element
  - create button which will read 'Make Player'
  - add an onclick listener to button to trigger makePlayer function. Since we are currently within the 'person' we can pass the current person.id to the makePlayer button for this person. that way each button will call the function to its appropriate id.

  listPlayer() function:

  This function will follow the same basic steps as listPeople except for the 'listOfPlayers' array:
    - target an element to append a list of players
    - for each 'player' in listOfPlayers:
    - create an li and set inner text to player info.
    - also add a 'red team' and 'blue team' button to each player to assign them to different teams.

Now we need to make a makeTeammate function which will take in a player and return a teammate for either time. Our 'red team' 'blue team' buttons will need to trigger this function and pass in info to target the correct player.

First we will make a Teammate class:

- this will extend player class
- this will pass additional properties mascot and teamcolor in the constructor.
- all properties from the player will be passed using super().

makeTeammate function : 

this function will take in an id and a color to create either a red or blue teammate, and push that teammate to the appropriate team array.

-if color is 'red' set team to redTeam and mascot to Wolves.
- if color is 'blue' set team to blueTeam and mascot to Dolphins.

this function will be very similar to makePlayer: 
  -it will use the index to pull the appropriate player
  - create new Teammate() constructor using properties from the selected player
  - push the new teammate to the correct team array.
  - splice out the former player from the former players array
  - call listPlayers() and listTeammates() functions to update our DOM display of the updated arrays.
