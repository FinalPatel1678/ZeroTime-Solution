import { Request, Response } from "express";
import { currDir, filterFiles, readdir, setResult } from "../helper";

import AdmZip from "adm-zip";
import { RootObject } from "../modal";

export const search = async (
  req: Request<
    undefined,
    undefined,
    {
      data: string[];
    }
  >,
  res: Response
) => {
  try {
    let start = Date.now();

    // check for the input array
    if (req.body.data?.length) {
      // create result object
      let result: Record<string, string[]> = {};
      
      const reqData = req.body.data;

      // assigning default value to the result object
      reqData.forEach((x) => {
        result[x] = [];
      });

      // get list of valid file names
      let fileNames = await readdir(currDir);
      fileNames = fileNames.filter(filterFiles);

      fileNames.forEach((fileName: string) => {
        // load zip file into adminZip
        const zip = new AdmZip(`${currDir}/${fileName}`);

        // get total entries from zip files
        const zipEntries = zip.getEntries();

        // get first entry of files as we have only one json file in zip
        const dataFile = zipEntries[0];

        // get data from json file and create RootObject from that
        const data: RootObject = JSON.parse(dataFile.getData().toString());

        data.CVE_Items.forEach((cveItem) => {
          cveItem.configurations.nodes.forEach((node) => {
            // setResult is a function who creates a result object
            setResult(node, cveItem.cve.CVE_data_meta.ID, reqData, result);
          });
        });
      });

      // truncate result to return only maximum 10 id's
      const resultData = Object.keys(result).map((key) => ({
        [key]: result[key].slice(0, 10),
      }));

      // total time taken by this function (just for development purpose)
      console.log(
        "Total time taken : " + (Date.now() - start) + " milliseconds"
      );

      return res.send(resultData);
    } else {
      throw new Error("Missing parameter 'Data'");
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
    return res.status(500).send("Error while performing operation");
  }
};
