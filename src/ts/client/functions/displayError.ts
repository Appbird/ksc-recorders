import { elementWithoutEscaping } from "../../utility/ViewUtility";
const marked = require("marked");
export function displayError(title:string,msg:string, articleDOM:HTMLElement){
    articleDOM.appendChild(
        elementWithoutEscaping`
    <div class = "c-recordGroupHeader">
        <div class="c-title">
            <div class="c-title__main">${title}</div>
            <div class="c-title__sub">Error: Failed to prepare the page.</div>
        </div>
        <hr noshade class="u-bold">${marked(msg)}</div>`
    )
    return;
}