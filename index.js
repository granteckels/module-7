// TODO: Include packages needed for this application
import inquirer from "inquirer";
import fs from 'fs';
import generateMarkdown from './utils/generateMarkdown.js'

// TODO: Create an array of questions for user input
const questions = [
  // type: 'input' is default
  {
    name: 'Title',
    message: 'Enter the project title:'
  },
  {
    name: 'Description',
    message: 'Enter the project description:'
  },
  {
    name: 'Installation',
    message: 'Enter the installation instructions:'
  },
  {
    name: 'Usage',
    message: 'Enter the usage information:'
  },
  {
    name: 'Contributing',
    message: 'Enter instructions about how to contribute:'
  },
  {
    name: 'Tests',
    message: 'Enter the instructions to test the application:'
  },
  {
    type: 'list',
    name: 'License',
    message: 'Select license to use:',
    choices: [
      'Apache License 2.0',
      'BSD 2-Clause "Simplified" License',
      'GNU General Public License v3.0',
      'MIT License',
      'Mozilla Public License 2.0'
    ]
  },
  {
    name: 'githubUsername',
    message: 'Enter your GitHub username:'
  },
  {
    name: 'email',
    message: 'Enter your email address:'
  }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  // Rearrange the data so it's in the correct order
  const keyOrder = [
    "Title",
    "Description",
    "Installation",
    "Usage",
    "License",
    "Contributing",
    "Tests",
    "githubUsername",
    "email"
  ]

  data = Object.fromEntries(
    keyOrder.map(key => [key, data[key]])
  )

  const doc = generateMarkdown(data);

  fs.writeFile(fileName, doc, "utf8", (err) => {
    if(err) console.log(err);
  })
}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
// init();

// import { data } from './utils/testData.js';

// writeToFile('README.md', data);

inquirer.prompt(questions).then((answers) => {
  writeToFile('Generated README.md', answers);
})