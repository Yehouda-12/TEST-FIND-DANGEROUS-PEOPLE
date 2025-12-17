import fs from "node:fs";
const url = `https://spies-test-server.vercel.app/`;

export async function getListFromServer(pathParam) {
  const url = `https://spies-test-server.vercel.app/${pathParam}`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function writeToJson(text, nameFile) {
  fs.writeFile(nameFile, text, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File written successfully");
  });
}

export async function getPeopleAndWrite(nameFile) {
  const text = await getListFromServer("/people");
  writeToJson(text, nameFile);
}
export async function getrecordAndWrite(nameFile) {
  const text = await getListFromServer("/transcriptions");
  writeToJson(text, nameFile);
}
