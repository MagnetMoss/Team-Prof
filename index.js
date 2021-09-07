const inquirer = require('inquirer')
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const employees = []
const generateTeam = require('./util/generateHtml')
const fs = require('fs')

const addEngineer = async () => {
   const { name, employeeID, email, gitHub } = await inquirer.prompt([
       {
           name: 'name',
           type: 'input',
           message: 'Engineer Name'
       },
       {
           name: 'employeeID',
           type: 'input',
           message: 'Employee ID?'
       },
       {
           name: 'email',
           type: 'input',
           message: 'Email'
       },
       {
           name: 'gitHub',
           type: 'input',
           message: 'GitHub Username'
       },
   ]);
   const newEngineer = new Engineer(name, employeeID, email, gitHub)
   employees.push(newEngineer)
   addEmployee()
}

const addIntern = async () => {
   const { name, employeeID, email, school } = await inquirer.prompt([
       {
           name: 'name',
           type: 'input',
           message: 'Intern Name?'
       },
       {
           name: 'employeeID',
           type: 'input',
           message: 'Employee ID?'
       },
       {
           name: 'email',
           type: 'input',
           message: 'Email?'
       },
       {
           name: 'school',
           type: 'input',
           message: 'Current School?'
       },
   ]);
   const newIntern = new Intern(name, employeeID, email, school)
   employees.push(newIntern)
   addEmployee()
}

const addEmployee = async () => {
   const { choice } = await inquirer.prompt([
       {
           name: 'choice',
           type: 'list',
           message: 'Would you like to add a new employee?',
           choices: ['Engineer', 'Intern', 'Done']
       }
   ])
   console.log(choice)
   switch (choice) {
       case 'Engineer':
           console.log('do this')
           addEngineer();
           break;
       case 'Intern':
           addIntern();
           break;
       case 'Done':
           finish();
           break;
   }
}


const main = async () => {
   const { name, employeeID, email, officeNumber } = await inquirer.prompt([
      {
         name: 'name',
         type: 'input',
           message: 'Manager Name'
       },
       {
           name: 'employeeID',
           type: 'input',
           message: 'Employee ID'
       },
       {
           name: 'email',
           type: 'input',
           message: 'Email'
         },
         {
           name: 'officeNumber',
           type: 'input',
           message: 'Office Number'
       },
   ]);
   const manager = new Manager(name, employeeID, email, officeNumber)
   employees.push(manager)
   addEmployee()
}

const finish = () => {
   fs.writeFile('index.html', generateTeam(employees), (err) => {console.log(err)})
}

main()