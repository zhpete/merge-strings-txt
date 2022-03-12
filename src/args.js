module.exports = {
  input: {
    description: 'Path to the directory where the txt files to merge can be found',
    alias: 'i',
    demandOption: true,
    type: 'string',
    normalize: true,
  },
  output: {
    description: 'Path to the output file to save the merged strings to',
    alias: 'o',
    demandOption: true,
    default: './strings.txt',
    type: 'string',
    normalize: true,
  },
};
