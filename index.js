const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { version } = require('./package.json');

const createDir = (dirPath) => {
    fs.mkdir(process.cwd() + dirPath, { recursive: true }, (error) => {
        if (error) {
            console.error('An error occurred: ', error);
        } else {
            console.log('Created directory: ' + dirPath);
        }
    });
}

const createFile = (filePath, fileContent) => {
    fs.writeFile(filepath, fileContent, (error) => {
        if (error) {
            console.error('An error occurred: ', error);
        } else {
            console.log('Created file: ' + filepath);
        }
    });
}

const fsReadFile = (fileName) => {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            const fileExists = fs.existsSync(fileName);

            if (fileExists === true) {
                clearInterval(checkInterval);

                fs.readFile(fileName, 'utf8', (error, dataString) => {
                    if (!error && dataString) {
                        resolve(dataString);
                    } else {
                        reject(error);
                    }
                });
            }
        }, 50);
    });
}

const promptInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

promptInterface.question('? Name for project: ', projectName => {
    console.log('Creating project structure for "' + projectName + '"...');

    const projectPath = path.sep + projectName + path.sep;
    const srcDir = projectPath + 'src' + path.sep;
    const distDir = projectPath + 'dist' + path.sep;
    const cssDir = srcDir + 'css' + path.sep;
    const imageDir = srcDir + 'images' + path.sep;

    createDir(projectPath);
    createDir(srcDir);
    createDir(distDir);
    createDir(cssDir);
    createDir(imageDir);

    const projectDirFull = process.cwd() + projectPath;

    fs.copyFile('target' + path.sep + '.gitignore', projectDirFull + '.gitignore', (gitIgnoreError) => {
        if (gitIgnoreError) {
            console.error('Error copying .gitignore file: ' + gitIgnoreError);
        } else {
            console.log('Copied .gitignore file.');
        }
    });

    fs.copyFile('target' + path.sep + '.eslintrc', projectDirFull + '.eslintrc', (eslintError) => {
        if (eslintError) {
            console.error('Error copying .eslintrc file: ' + eslintError);
        } else {
            console.log('Copied .eslintrc file.');
        }
    });

    fs.copyFile('target' + path.sep + 'webpack.config.js', projectDirFull + 'webpack.config.js', (webpackError) => {
        if (webpackError) {
            console.error('Error copying webpack.config.js file: ' + webpackError);
        } else {
            console.log('Copied webpack.config.js file.');
        }
    });

    fs.copyFile('target' + path.sep + 'target-package.json', projectDirFull + 'package.json', (packageError) => {
        if (packageError) {
            console.error('Error copying package.json file: ' + packageError);
        } else {
            console.log('Copied package.json file.');
        }
    });

    fs.copyFile('target' + path.sep + 'target-README.md', projectDirFull + 'README.md', (readmeError) => {
        if (readmeError) {
            console.error('Error copying README.md file: ' + readmeError);
        } else {
            console.log('Copied README.md file.');
        }
    });

    const srcDirFull = process.cwd() + srcDir;

    fs.copyFile('target' + path.sep + 'target-index.js', srcDirFull + 'index.js', (indexJsError) => {
        if (indexJsError) {
            console.error('Error copying index.js file: ' + indexJsError);
        } else {
            console.log('Copied index.js file.');
        }
    });

    fs.copyFile('target' + path.sep + 'target-index.html', srcDirFull + 'index.html', (indexHtmlError) => {
        if (indexHtmlError) {
            console.error('Error copying index.html file: ' + indexHtmlError);
        } else {
            console.log('Copied index.html file.');
        }
    });

    fsReadFile(srcDirFull + 'index.html')
        .then(html => {
            html = html.replace('<title></title>', '<title>' + projectName + '</title>');

            fs.writeFile(srcDirFull + 'index.html', html, { encoding: 'utf8' }, function (error) {
                if (error) {
                    console.error('Error writing updated index.html <title>.');
                } else {
                    console.log('Updated index.html <title>.');
                }
            });
        })
        .catch(error => {
            console.error('Error updating index.html <title>.');
            console.log(error);
        });

    const cssDirFull = process.cwd() + cssDir;

    fs.copyFile('target' + path.sep + 'pure-min.css', cssDirFull + 'pure-min.css', (cssError) => {
        if (cssError) {
            console.error('Error copying CSS files: ' + cssError);
        } else {
            console.log('Copied CSS files.');
        }
    });

    const imageDirFull = process.cwd() + imageDir;

    fs.copyFile('target' + path.sep + 'favicon.png', imageDirFull + 'favicon.png', (faviconError) => {
        if (faviconError) {
            console.error('Error copying favicon.png file: ' + faviconError);
        } else {
            console.log('Copied favicon.png file.');
        }
    });

    fsReadFile(projectDirFull + 'package.json')
        .then(jsonDataRaw => {
            const projectJson = JSON.parse(jsonDataRaw);

            projectJson.name = projectName;

            const projectJsonData = JSON.stringify(projectJson, null, 1);

            fs.writeFile(projectDirFull + 'package.json', projectJsonData, function (error) {
                if (error) {
                    console.error('Error writing updated package.json name.');
                } else {
                    console.log('Updated package.json name.');
                }
            });
        })
        .catch(error => {
            console.error('Error updating package.json name.');
        });

    fsReadFile(projectDirFull + 'README.md')
        .then(readmeMarkdown => {
            readmeMarkdown = readmeMarkdown.replace('# My App', '# ' + projectName);
            readmeMarkdown = readmeMarkdown.replace('Sling.js CLI', 'Sling.js CLI v' + version);

            fs.writeFile(projectDirFull + 'README.md', readmeMarkdown, { encoding: 'utf8' }, function (error) {
                if (error) {
                    console.error('Error writing updated README.md information.');
                } else {
                    console.log('Updated README.md information.');
                }
            });
        })
        .catch(error => {
            console.error('Error updating README.md information.');
        });

    promptInterface.close();
});
