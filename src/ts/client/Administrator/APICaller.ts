import { APIFunctions } from "../../type/api/relation";

export class APIAdministrator {
    private origin: string;
    constructor(origin: string = "http://localhost:5000") {
        this.origin = origin;
    }
    async access<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]): Promise<APIFunctions[T]["atClient"]> {
        const convertedName = functionName.replace(/\_/g, "/");
        const response = await fetch(`${this.origin}/api/${convertedName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requiredObj)
        });
        if (response.status !== 200){
            let responseData = "";
            try{responseData = (await response.json()).message} catch(error) { responseData = "メッセージがありませんでした。" }
            throw new Error(`# API: ${convertedName}へのリクエストの結果\n\n### ${response.status} : ${response.statusText} \n\n${responseData}\n\n# 入力\n\n${JSON.stringify(requiredObj)}`);
        }
        const result = await response.json();
        return result;
    }
}
