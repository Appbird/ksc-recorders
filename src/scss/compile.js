const sass = require("sass");
const node_sass_glob = require("node-sass-globbing");
const fs = require("fs/promises")
sass.render({
    file:"common.scss"
},(err,rendered) => {
    if (err !== undefined){
        console.log(err)
        return;
    }
    fs.writeFile("../../build/css/common.css",rendered,)
})