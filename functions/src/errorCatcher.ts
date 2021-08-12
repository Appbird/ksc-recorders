export function errorCatcher(key: string, type: "failed" | "rejected" | "", error: any) {
    console.log(`\u001b[31m[${new Date().toLocaleString()} / ${type}] failed to execute /api${key}\u001b[0m\n`);
    if (!(error instanceof Error)) {

        console.error(`予期せぬエラーです。`);
        return { isSuccess: false, message: String(error) };
    }
    const errorInString = error.message;
    console.error(`${errorInString}\n${error.stack}`);
    return { isSuccess: false, message: errorInString };
}
