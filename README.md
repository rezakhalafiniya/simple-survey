#About

THis is a simple surveying tool, built with VueJs and PHP/Laravel. 

After registration, you will be logged in, and then you can create a survey.

If you are just a visitor you can choose a nickname and take part in the existing surveys.

#Demo
[Simple Survey example site](https://simplesurvey.rkis.me)

---

#Creating Survey
## Survey:
First create a survey by clicking on "Add New Survey" in the top menu.
Each survey should have a title, description and a unique slug.
After giving desired information for the survey and clicking on save , you can create questions and rules.
### Questions:
After the survey is saved, click on the plus (+) sing in the questions tabs.
Give the desired question and click save. After save you can add the possible answers to the question.
#### Answers:
Create your answers after the question is saved by giving the answer text and the value for that answer.
The results of the survey will be calculated based on the value of the selected answers.

###Rules:
Each survey can have several rules, and none or several rules can be shown after the survey is submited by participant.
####Rule Text
This Text will be shown to the participant after survey submission, if the logic is met.
####Rule Logic
The format of the logic: Operator;value (operator and value are seperated by semicolon.) <br/>Example: &lt;;25 . This means that this rule text will be shown if the sum of the answered values are smaller than 25.
<br/>Possible Operator: &lt; , &gt; , &lt;= , &gt;=


---
#Development
## Requirements:
- Docker and Docker-compose
- NodeJs, npm or yarn, vue-cli-service (For frontend development)

##Setup
- Clone the repository and go to the repository folder.
- Copy the .env.dist to .env file : ``cp .env.dist .env``
- Run the docker-compose with : ``docker-compose up``
- Install Laravel dependencies by composer through the composer docker: `` docker run --rm -it --volume $(pwd):/app composer  --ignore-platform-reqs install``
- Add database info to the .env file in RepositoryFolder/app/.env (database info can be copied from the base .env file.)
- run migrations with : ``docker-compose exec php /var/www/html/artisan migrate`` 
- Visit the app at http://localhost:888
- If trying to work on the Frontend run the command in frontend folder: ``yarn install && yarn serve`` and visit the page http://localhost:8080

---
# TODOS and Improvements
- Improve UI
- Define and restrict api routes
- Define different types of answer
- Implement Unite Tests
- Define more validation on user inputs 
- Email verification for signup
- SSO 

