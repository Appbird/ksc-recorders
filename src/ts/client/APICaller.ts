import { APIFunctions } from "../type/api/relation";

export class APIAdminister {
    private origin: string;
    constructor(origin: string = "http://localhost:3000") {
        this.origin = origin;
    }
    async access<T extends keyof APIFunctions>(functionName: T, requiredObj: APIFunctions[T]["atServer"]): Promise<APIFunctions[T]["atClient"]> {
        const response = await fetch(`${this.origin}/api/${functionName.replace(/\_/g, "/")}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requiredObj)
        });
        if (response.status !== 200)
            throw new Error(
                `# APIを利用した通信に失敗しました。\n\n## 使用したAPI\n\n${functionName}\n\n## 原因\n\n${(await response.json()).message}\n\n## 入力オブジェクト\n\n${JSON.stringify(requiredObj)}`
            );
        const result = await response.json();
        return result;
    }
}
