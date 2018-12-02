// const execa = require("execa");
import execa from "execa";
const path = require("path");

module.exports = async (folder: string) => {
        const { stdout, stderr, code, failed, killed, signal, timedOut } = await execa(
            path.join(__dirname, "../node_modules/.bin/cloc"), ["--json", folder]);

        if (stderr !== "") throw new Error(stderr.trim());
        if (code !== 0) throw new Error("Unexpected returned code : " + code);
        if (failed !== false) throw new Error("Failure");
        if (killed !== false) throw new Error("Program was killed");
        if (signal !== null) throw new Error("Uncatched signal");
        if (timedOut !== false) throw new Error("Timeout");

        return JSON.parse(stdout);
};