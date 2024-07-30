const fs = require('fs');
const yargs = require('yargs');

function writeToFile(filename) {
    const data = 'You are awesome\n';
    fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log(`File ${filename} has been created and written.`);
    });
}

function handleFileOperations(argv) {
    const filename = argv.filename;

    fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
            writeToFile(filename);

            fs.appendFile('filenames.txt', `${filename}\n`, (err) => {
                if (err) throw err;
                console.log(`Filename ${filename} added to filenames.txt.`);
            });
        } else {
            console.log(`File ${filename} already exists. Please provide a new filename.`);
        }
    });
}

yargs.command({
    command: 'create',
    describe: 'Create a new file and save filename to list',
    builder: {
        filename: {
            describe: 'Name of the file to create',
            demandOption: true,
            type: 'string'
        }
    },
    handler: handleFileOperations
});

yargs.parse();
