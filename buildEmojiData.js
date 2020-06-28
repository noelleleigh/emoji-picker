/**
 * Make a JSON array of emoji data for each locale
 */

import fs from "fs";
import path from "path";
import xml2js from "xml2js";

const parseAnnotations = async (filePath) => {
  console.log(filePath);

  const fileContents = await fs.promises.readFile(filePath, {
    encoding: "utf-8",
  });
  const parser = new xml2js.Parser({
    charkey: "keywords",
    mergeAttrs: true,
    valueProcessors: [
      (value, name) => {
        if (name !== "annotation") return value;
        return value.split(" | ");
      },
    ],
  });
  const parsedContents = await parser.parseStringPromise(fileContents);

  // Clean up the output
  // We don't need the identity key
  delete parsedContents.ldml.identity;
  // We don't need the text-to-speech values
  const annotations = parsedContents.ldml.annotations[0].annotation;
  const filteredAnnotations = annotations.filter(
    (annotation) => !annotation.type
  );
  parsedContents.ldml.annotations[0].annotation = filteredAnnotations;

  return parsedContents;
};

const main = async () => {
  const localesDir = await fs.promises.opendir("_locales");
  // Iterate over the locale subdirectories
  for await (const localeDirent of localesDir) {
    if (!localeDirent.isDirectory()) continue;

    const cldrDir = await fs.promises.opendir(
      path.resolve(localesDir.path, localeDirent.name, "CLDR")
    );
    // Iterate over the files in the CLDR subdirectory
    for await (const cldrDirent of cldrDir) {
      // Only parse the XML files
      if (!cldrDirent.isFile()) continue;
      if (!cldrDirent.name.endsWith(".xml")) continue;

      // Make a JS object
      const cldrFilePath = path.resolve(cldrDir.path, cldrDirent.name);
      const result = await parseAnnotations(cldrFilePath);

      // Make a filename for the JSON output
      const jsonPathObject = path.parse(cldrFilePath);
      jsonPathObject.ext = ".json";
      delete jsonPathObject.base;

      // Write out the JSON file
      const jsonFilePath = path.format(jsonPathObject);
      await fs.promises.writeFile(
        jsonFilePath,
        JSON.stringify(result, null, 2),
        "utf-8"
      );
    }
  }
};

main().catch(console.error);
