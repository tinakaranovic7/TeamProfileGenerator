const fs = require("fs")
const inquirer = require("inquirer")
const path = require("path")

const Manager = require("./classes/manager")
const Intern = require("./classes/intern")
const Engineer = require("./classes/engineer")

const render = require("./render")

const outputPath = path.resolve(__dirname,"output", "team.html")

var teamMembers = [];
function buildPage(){
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

function createTeam(){
    
    inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
              "Manager",
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
          ]
        }
      ]).then(userChoice => {
        switch(userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
          case "Manager":
              addManager();
              break;
        default:
          buildPage();
        }
      });

}

function addManager(){
    inquirer.prompt([{
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
    },
    {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
    },
    {
        
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
    }


]).then(answers => {
    var manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
    teamMembers.push(manager);
    createTeam();
    
})
}

function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
      
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
        
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
        
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      
      createTeam();
    });
  }

  createTeam()