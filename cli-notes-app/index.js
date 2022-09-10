/*
Title: Notes app in console
Description: Can add,remove,list and read notes using command line interface
Author: Fahim Hasan Mehedi
Data: 11/9/2022
*/

//dependencies
const yargs = require("yargs");
const { addNote, removeNote, listNotes, readNote } = require("./notes");


//configuring the commands using yargs module
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "removing a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list of notes",
  handler: function () {
    listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    readNote(argv.title);
  },
});

//parse the command line arguments to make things work
yargs.parse();
