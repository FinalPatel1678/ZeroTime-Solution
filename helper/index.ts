import { Node } from "../modal";
import fs from "fs";
import path from "path";

export const currDir = path.join(__dirname + "/../config/");

export const readdir = (dirname: fs.PathLike) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirname, (error, filenames) => {
      if (error) {
        reject(error);
      } else {
        resolve(filenames);
      }
    });
  });
};

export const filterFiles = (filename: string) => {
  return path.extname(filename) === ".zip";
};

export const setResult = (
  node: Node,
  id: string,
  reqData: string[],
  result: Record<string, string[]>
) => {
  if (node.operator === "OR") {
    node.cpe_match.forEach((cpe) => {
      reqData.forEach((input) => {
        if (cpe.vulnerable && cpe.cpe23Uri.startsWith(input)) {
          result[input].push(id);
        }
      });
    });
  } else {
    node.children.forEach((nodeChild) =>
      setResult(nodeChild, id, reqData, result)
    );
  }
};
