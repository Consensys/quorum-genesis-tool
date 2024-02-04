import * as fs from 'fs-extra';
import * as path from 'path';
import * as tar from 'tar';
import inquirer from 'inquirer';

const CONFIG_DIR = './config';
const OUTPUT_DIR = './output';
const BACKUP_DIR = './'; // Directory to save the backup tar.gz

// Finds the most recent directory inside the output directory
async function findLatestOutputDir(): Promise<string> {
    const dirs = await fs.readdir(OUTPUT_DIR);
    const sortedDirs = dirs.sort().reverse();
    return path.join(OUTPUT_DIR, sortedDirs[0]);
}

// Simulates the copy operation
async function simulateCopy(srcDir: string, destDir: string) {
    const files = await fs.walk(srcDir);
    files.forEach(file => {
        const relativePath = path.relative(srcDir, file.path);
        const destPath = path.join(destDir, relativePath);
        console.log(`Will copy ${file.path} to ${destPath}`);
    });
}

// Performs the actual copy operation
async function performCopy(srcDir: string, destDir: string) {
    const files = await fs.walk(srcDir);
    for (const file of files) {
        const relativePath = path.relative(srcDir, file.path);
        const destPath = path.join(destDir, relativePath);
        await fs.copy(file.path, destPath);
        console.log(`Copied ${file.path} to ${destPath}`);
    }
}

// Creates a backup of the config directory
async function backupConfigDir() {
    const backupFileName = `config-backup-${new Date().toISOString()}.tar.gz`;
    const backupFilePath = path.join(BACKUP_DIR, backupFileName);
    await tar.c(
        {
            gzip: true,
            file: backupFilePath,
        },
        [CONFIG_DIR]
    );
    console.log(`Backup created at ${backupFilePath}`);
}

// Main function to run the script
async function main() {
    const latestOutputDir = await findLatestOutputDir();
    await simulateCopy(latestOutputDir, CONFIG_DIR);

    const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Do you want to proceed with the file copy?',
        default: false,
    }]);

    if (answers.proceed) {
        await backupConfigDir();
        await performCopy(latestOutputDir, CONFIG_DIR);
        console.log('Files have been successfully copied and replaced.');
    } else {
        console.log('Operation cancelled.');
    }
}

main().catch(console.error);
