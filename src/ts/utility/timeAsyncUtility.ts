/**
 * 指定したミリ秒後に解決するPromiseオブジェクトを渡します。
 * @param miliSec 待つ時間
 * @returns Promise<void>
 * @example
 * ```typescript
 * // 30ミリ秒待機します。 
 *  await miliseconds(30)
 * ```
 */
export async function miliseconds(miliSec:number){
    return new Promise<void>((resolve) =>  {window.setTimeout(() => resolve(), miliSec )})
}