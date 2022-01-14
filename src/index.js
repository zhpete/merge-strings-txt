const { once } = require('events');
const {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} = require('fs');
const mergeUniqueArrayItems = require('lodash.union');
const { join: joinPath } = require('path');
const { createInterface } = require('readline');

const isTxtFile = (path) => statSync(path).isFile() && path.endsWith('.txt');
const getFiles = (path) => readdirSync(path)
  .map((name) => joinPath(path, name))
  .filter(isTxtFile);

const readFileLines = async (path) => {
  const lines = [];
  const rl = createInterface({
    crlfDelay: Infinity,
    input: createReadStream(path),
  });
  rl.on('line', (line) => lines.push(line));
  await once(rl, 'close');
  lines[0] = lines[0].trim(); // trim here is kind of a hack to avoid a weird character
  return lines;
};

const writeArrayItemsToNewlineDelimitedFile = (path, items) => {
  writeFileSync(path, items.join('\n'));
  console.log('File processed.');
};

const mergeStringsFilesInDirectory = async (dirPath, outputPath) => {
  const [firstFile, ...additionalFiles] = getFiles(dirPath);
  let strings = await readFileLines(firstFile);
  for (let i = 0; i < additionalFiles.length; i += 1) {
    const file = additionalFiles[i];
    const additionalStrings = await readFileLines(file); // eslint-disable-line no-await-in-loop
    strings = mergeUniqueArrayItems(strings, additionalStrings);
  }
  writeArrayItemsToNewlineDelimitedFile(outputPath, strings.sort());
};

if (!existsSync('./output')) mkdirSync('./output');
mergeStringsFilesInDirectory('./', './output/strings.txt');
