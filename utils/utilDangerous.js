 
import fs from "node:fs";
import { loadFromJson,searchPeopleByAge } from "./utilSearch.js";

export async function dangerCalculate(fileName){
    try {
        const data = await loadFromJson(fileName);
        const transcriptions = JSON.parse(data);
        const dangerWords = ["death", "knife", "bomb", "attack"];
        const dangerByAge = {};
        const levelDangerForEach={}
        for (let i = 0 ;i<transcriptions.length;i++) {
            let dangerLevel = 0;
            const contentLower = transcriptions[i].content.toLowerCase();
            for (const word of dangerWords) {
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                const matches = contentLower.match(regex);
                if (matches) {
                    dangerLevel += matches.length;
                    
                }
            }
            if (dangerLevel > 0) {
                if (!dangerByAge[transcriptions[i].age]) {
                    dangerByAge[transcriptions[i].age] = [];
                }
                dangerByAge[transcriptions[i].age].push(dangerLevel);
                transcriptions[i].dangerLevel=dangerLevel
            }
        }
        const avgDangerByAge = {};
        for (const age in dangerByAge) {
            const levels = dangerByAge[age];
            const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
            avgDangerByAge[age] = avg;
        }
        const topAges = Object.entries(avgDangerByAge)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(entry => parseInt(entry[0]));
        ;
        return {dangerByAge,avgDangerByAge,topAges,transcriptions}
    } catch (error) {
        console.log(error);
    }
}

                
export async function addDangerLevel(fileName){
    const result = await dangerCalculate(fileName)
    return result.transcriptions

}
export async function asignDangerLevelByAge(fileName) {
     const result = await dangerCalculate(fileName)
    return result.dangerByAge


    
}
export async function getTop3Age(fileName) {
     const result = await dangerCalculate(fileName)
    return result.topAges

    
}
export async function getPeopleWithDangerousAge(fileName,fileOfPeople){
    const ages = await getTop3Age(fileName)
    
    const result = []
    for(const age of ages){
        const find = await searchPeopleByAge(fileOfPeople,age)
        result.push(find)

    }
    return result 
    


}

 export async function postListOfDangerousPeoples(fileName,fileOfPeople){
    const people = await getPeopleWithDangerousAge(fileName,fileOfPeople)
    const url = `https://spies-test-server.vercel.app/report?people=${people[0],people[1],people[2]}`;
   try {
    const response = await fetch(url);
    if (response.status === 404) {
      return false;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text()
    console.log(data)
    
    
  } catch (error) {
    console.log(error);
  }
}



