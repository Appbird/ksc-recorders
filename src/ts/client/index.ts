import App from "./App";
const articleDOM =  document.getElementById("article")
if (articleDOM === null) throw new Error("idがarticleである要素を見つけられませんでした。")
const app = new App(articleDOM,"Japanese");
(async () => {
    await app.init();
    app.transition("gameSystemSelector",null);
})();
