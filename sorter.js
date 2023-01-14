const fs = require('fs');

const keepNumbers = [5,6,7]

function deleteFilesInFolder(folderName) {
  // Get a list of files in the folder
  const files = fs.readdirSync(folderName);

  // Loop through the files
  for (const file of files) {
    // Create the full file path
    const filePath = `${folderName}/${file}`;

    // Delete the file
    fs.unlinkSync(filePath);
  }
}


function groupWordsByLength(words) {
  // Create an object to store the groups
  const groups = {};

  // Loop through the array of words
  for (const [key, value] of Object.entries(words)) {

    // Get the length of the words property
    const length = key.length;

    if(keepNumbers.includes(length)){
      // If a group for this length doesn't exist, create it
      if (!groups[length]) {
        groups[length] = [];
      }

      // Add the word to the group
      groups[length].push(key);
    }
  }

  // Loop through the groups
  for (const [length, group] of Object.entries(groups)) {
    // Create a file name for the group
    const fileName = `sorted_words/words_length_${length}.json`;

    // Write the group data to a JSON file
    fs.writeFileSync(fileName, JSON.stringify(group));
  }
}

//gets json object from unsorted.json
const words = require("./unsorted.json");


//function calls
deleteFilesInFolder('sorted_words');
groupWordsByLength(words);
