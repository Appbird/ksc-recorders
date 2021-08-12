import AbilityList from "./AbilityList.json"

const result = "Japanese English";
for (const ability of AbilityList){
    result += `${ability.} `
}