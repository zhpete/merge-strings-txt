# Merge strings.txt

Merge strings.txt files for Frosty

## Usage

Download the latest executable from the [releases](https://github.com/zhpete/merge-strings-txt/releases) page.
Open a terminal and run
```sh
./path/to/executable/MergeStringsTxt.exe --help
```

The script accepts an `input` argument which specifies a folder where the `.txt` files you want to merge are located.
An `output` argument can also be provided but if it is omitted then the merged file will be created at `./strings.txt`.

**Example**
```sh
MergeStringsTxt.exe -i path/to/strings/files -o path/to/frosty/strings.txt
```

## Running for development

Requires [Node.js](https://nodejs.org/) to be installed.

Open a terminal in the project root and run the following:
```sh
npm install
node src --help
```
