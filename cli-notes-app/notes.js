/*
Title: Add, remove, list and read notes
Description: Module to add, remove, list and read notes
Author: Fahim Hasan Mehedi
Data: 11/9/2022
*/

const fs = require("fs");
const chalk = require("chalk");

//exported object
const notes = {};

//configuration for chalk
const error = chalk.bold.red.inverse;
const success = chalk.bold.green.inverse;

//helper functions
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const saveNotes = function (notes) {
  const JSONdata = JSON.stringify(notes);
  fs.writeFileSync("notes.json", JSONdata);
};
//////////////////

//functions to add,remove,list and read notes
notes.addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(success("New note added."));
  } else {
    console.log(error("Note title already taken."));
  }
};

notes.removeNote = function (title) {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);

  console.log(newNotes);

  if (newNotes.length < notes.length) {
    saveNotes(newNotes);
    console.log(success("Removed the note"));
  } else {
    console.log(error("Please enter a valide note title to remove"));
  }
};

notes.listNotes = function () {
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(chalk.cyan("-----------------------"));
    console.log(
      chalk`{magenta Title}: ${note.title}\n{magenta Body}: ${note.body}`
    );
    console.log(chalk.cyan("-----------------------"));
  });
};

notes.readNote = function (title) {
  const notes = loadNotes();
  const [note] = notes.filter((note) => note.title === title);

  if (!note) return console.log("Title does not match any notes.");

  console.log(chalk.cyan("-----------------------"));
  console.log(
    chalk`{magenta Title}: ${note.title}\n{magenta Body}: ${note.body}`
  );
  console.log(chalk.cyan("-----------------------"));
};
//////////////////////////

module.exports = notes;
