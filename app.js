import { searchPeopleByAge,searchPeopleByName,loadFromJson } from "./utils/utilSearch.js"
import { dangerCalculate,addDangerLevel,asignDangerLevelByAge,getTop3Age,getPeopleWithDangerousAge,postListOfDangerousPeoples } from "./utils/utilDangerous.js"
import { getListFromServer,writeToJson,getPeopleAndWrite,getrecordAndWrite,readData } from "./utils/utilData.js"
import fs from "node:fs";
const menu =`1. Get People List 
2. Get Call Records/Transcriptions  
3. Search People by Name 
4. Search People by Age 
5. Find Dangerous People`

console.log("===Welcome to Agency System===")

getPeopleAndWrite('./data/PEOPLE.js')
getrecordAndWrite('./data/TRANSCRIPTIONS.js')




