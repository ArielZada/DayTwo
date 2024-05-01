Hello! this is superheroes MS!
instructions for this product:
start the project:
1) go to the folder daytwo
2) type npm install
3) type npm start

on "textFiles" folder we can find the instructions and postman collection to send requests
add data to the project:

1) add superHero:
   POST/ localhost:4000/superheroes
    data: mandatory fields are name, alias and powers. you might add weaknesses and foes.
example:
Request body as json:
   {
   "name": "Peter Parker",
   "alias": "Spiderman",
   "powers": [ "strength", "agility", "reflexes", "clinging", "web-shooting", "spider-sense"],
   "weaknesses": [ "Vulnerable to certain types of radiation", "limited resources for creating web-fluid" ],
   "foes": [ "Green Goblin", "Doctor Octopus", "Venom" ]
   }
2) get superhero:
  in order to get the desired superhero first we need to fetch all heroes by name and id
   GET/ localhost:4000/superheroes?onlyid=true
    it will provide the alias and its id. then send request to
   GET/ localhost:4000/superheroes/:id
3) get all superheroes:
 simply send GET/  localhost:4000/superheroes

Timer handling
in order to send messages to the base, follow the next format:
1) send POST/ localhost:4000/timers
{
"sender" : <Hero id>,
"message" :<message>,
"url" : "http://localhost:4000/base", this is a must url for the base! otherwise, message will not be sent
"hours" : valid number between 0 and 23,
"minutes" :valid number between 0 and 59,
"seconds" :valid number between 0 and 59
}
2) by send req to GET / localhost:4000/timers
we are able to get all data on timers. the timer has 3 statuses: pending, canceled or done.
3) in order to get message status, you can send 
GET / localhost:4000/timers/<messageID>

Base messaging handling
in order to see all Base messages you can send GET/ localhost:4000/base

