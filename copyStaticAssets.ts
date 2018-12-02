import globby from "globby";
import fse from "fs-extra";

const toCopy: string[] = [];

toCopy.push(...globby.sync("views"));

fse.mkdirp("dist");
toCopy.forEach(curr => {
    console.log({curr});
    fse.copySync(curr, "./dist/" + curr, {overwrite: true});
});
