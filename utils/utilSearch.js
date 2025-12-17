
import fs from "node:fs";

export async function loadFromJson(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function searchPeopleByName(fileName, name) {
  try {
    const data = await loadFromJson(fileName);
    const people = JSON.parse(data);
    const person = people.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (person.length > 0) {
      console.log(person);
    } else {
      console.log(`No person with this name`);
    }
  } catch (error) {
    console.log(error);
  }
}



export async function searchPeopleByAge(fileName, age) {
  try {
    const data = await loadFromJson(fileName);
    const people = JSON.parse(data);
    const person = people.filter((p) => p.age === age);
    if (person.length > 0) {
      return person;
    } else {
      return `No person with this age`;
    }
  } catch (error) {
    console.log(error);
  }
}


