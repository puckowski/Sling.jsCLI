const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { version } = require('./package.json');

const createDirSync = (dirPath) => {
    fs.mkdirSync(process.cwd() + dirPath, { recursive: true });
}

const createFileSync = (filePath, fileContent) => {
    fs.writeFileSync(filepath, fileContent, { encoding: 'utf8' });
}

const fsReadFile = (fileName) => {
    const INTERVAL_MILLIS = 50;

    return new Promise((resolve, reject) => {
        const CHECK_COUNT_MAX = (1000 / INTERVAL_MILLIS) * 5; // 5 seconds

        let checkCount = 0;

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

            checkCount++;

            if (checkCount === CHECK_COUNT_MAX) {
                clearInterval(checkInterval);

                reject('Failed to read file: "' + fileName + '".');
            }
        }, INTERVAL_MILLIS);
    });
}

const promptInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createStandardStructure(projectName) {
    const projectPath = path.sep + projectName + path.sep;
    const srcDir = projectPath + 'src' + path.sep;
    const distDir = projectPath + 'dist' + path.sep;
    const cssDir = srcDir + 'css' + path.sep;
    const imageDir = srcDir + 'images' + path.sep;

    createDirSync(projectPath);
    createDirSync(srcDir);
    createDirSync(distDir);
    createDirSync(cssDir);
    createDirSync(imageDir);

    const projectDirFull = process.cwd() + projectPath;
    const srcDirFull = process.cwd() + srcDir;
    const cssDirFull = process.cwd() + cssDir;
    const imageDirFull = process.cwd() + imageDir;

    const targetDir = 'target' + path.sep;
    const targetConfigDir = targetDir + 'config' + path.sep;
    const targetDocsDir = targetDir + 'docs' + path.sep;
    const targetSrcDir = targetDir + 'src' + path.sep;
    const targetCssDir = targetDir + 'css' + path.sep;
    const targetImageDir = targetDir + 'images' + path.sep;

    fs.copyFile(targetConfigDir + '.gitignore', projectDirFull + '.gitignore', (gitIgnoreError) => {
        if (gitIgnoreError) {
            console.error('Error copying .gitignore file: ' + gitIgnoreError);
        } else {
            console.log('Copied .gitignore file.');
        }
    });

    fs.copyFile(targetConfigDir + '.eslintrc', projectDirFull + '.eslintrc', (eslintError) => {
        if (eslintError) {
            console.error('Error copying .eslintrc file: ' + eslintError);
        } else {
            console.log('Copied .eslintrc file.');
        }
    });

    fs.copyFile(targetConfigDir + 'webpack.config.js', projectDirFull + 'webpack.config.js', (webpackError) => {
        if (webpackError) {
            console.error('Error copying webpack.config.js file: ' + webpackError);
        } else {
            console.log('Copied webpack.config.js file.');
        }
    });

    fs.copyFile(targetConfigDir + 'target-package.json', projectDirFull + 'package.json', (packageError) => {
        if (packageError) {
            console.error('Error copying package.json file: ' + packageError);
        } else {
            console.log('Copied package.json file.');
        }
    });

    fs.copyFile(targetDocsDir + 'target-README.md', projectDirFull + 'README.md', (readmeError) => {
        if (readmeError) {
            console.error('Error copying README.md file: ' + readmeError);
        } else {
            console.log('Copied README.md file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-index.js', srcDirFull + 'index.js', (indexJsError) => {
        if (indexJsError) {
            console.error('Error copying index.js file: ' + indexJsError);
        } else {
            console.log('Copied index.js file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-index.html', srcDirFull + 'index.html', (indexHtmlError) => {
        if (indexHtmlError) {
            console.error('Error copying index.html file: ' + indexHtmlError);
        } else {
            console.log('Copied index.html file.');
        }
    });

    fs.copyFile(targetCssDir + 'pure-min.css', cssDirFull + 'pure-min.css', (cssError) => {
        if (cssError) {
            console.error('Error copying Pure.css CSS file: ' + cssError);
        } else {
            console.log('Copied Pure.css CSS file.');
        }
    });

    fs.copyFile(targetCssDir + 'target-styles.css', cssDirFull + 'styles.css', (cssError) => {
        if (cssError) {
            console.error('Error copying styles.css CSS file: ' + cssError);
        } else {
            console.log('Copied styles.css CSS file.');
        }
    });

    fs.copyFile(targetImageDir + 'favicon.png', imageDirFull + 'favicon.png', (faviconError) => {
        if (faviconError) {
            console.error('Error copying favicon.png file: ' + faviconError);
        } else {
            console.log('Copied favicon.png file.');
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
            console.error(error);
        });

    fsReadFile(projectDirFull + 'package.json')
        .then(jsonDataRaw => {
            const projectJson = JSON.parse(jsonDataRaw);

            projectJson.name = projectName.replace(/\s/g, '');

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
            console.error(error);
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
            console.error(error);
        });
}

async function createInternationalizationStructure(projectName) {
    const projectPath = path.sep + projectName + path.sep;
    const srcDir = projectPath + 'src' + path.sep;
    const distDir = projectPath + 'dist' + path.sep;
    const cssDir = srcDir + 'css' + path.sep;
    const imageDir = srcDir + 'images' + path.sep;

    createDirSync(projectPath);
    createDirSync(srcDir);
    createDirSync(distDir);
    createDirSync(cssDir);
    createDirSync(imageDir);

    const projectDirFull = process.cwd() + projectPath;
    const srcDirFull = process.cwd() + srcDir;
    const cssDirFull = process.cwd() + cssDir;
    const imageDirFull = process.cwd() + imageDir;

    const targetDir = 'target-i18n' + path.sep;
    const targetConfigDir = targetDir + 'config' + path.sep;
    const targetDocsDir = targetDir + 'docs' + path.sep;
    const targetSrcDir = targetDir + 'src' + path.sep;
    const targetCssDir = targetDir + 'css' + path.sep;
    const targetImageDir = targetDir + 'images' + path.sep;

    const projectDir = srcDir + 'project' + path.sep;
    const servicesDir = projectDir + 'services' + path.sep;
    const componentsDir = projectDir + 'components' + path.sep;
    const storesDir = projectDir + 'stores' + path.sep;

    createDirSync(projectDir);
    createDirSync(servicesDir);
    createDirSync(componentsDir);
    createDirSync(storesDir);

    const servicesDirFull = process.cwd() + servicesDir;
    const componentsDirFull = process.cwd() + componentsDir;

    fs.copyFile(targetSrcDir + 'target-translation.service.js', servicesDirFull + 'translation.service.js', (translationJsError) => {
        if (translationJsError) {
            console.error('Error copying translation.service.js file: ' + translationJsError);
        } else {
            console.log('Copied translation.service.js file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-hello-world.component.js', componentsDirFull + 'hello-world.component.js', (helloJsError) => {
        if (helloJsError) {
            console.error('Error copying hello-world.component.js file: ' + helloJsError);
        } else {
            console.log('Copied hello-world.component.js file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-language-toggle.component.js', componentsDirFull + 'language-toggle.component.js', (toggleJsError) => {
        if (toggleJsError) {
            console.error('Error copying language-toggle.component.js file: ' + toggleJsError);
        } else {
            console.log('Copied language-toggle.component.js file.');
        }
    });

    fs.copyFile(targetConfigDir + '.gitignore', projectDirFull + '.gitignore', (gitIgnoreError) => {
        if (gitIgnoreError) {
            console.error('Error copying .gitignore file: ' + gitIgnoreError);
        } else {
            console.log('Copied .gitignore file.');
        }
    });

    fs.copyFile(targetConfigDir + '.eslintrc', projectDirFull + '.eslintrc', (eslintError) => {
        if (eslintError) {
            console.error('Error copying .eslintrc file: ' + eslintError);
        } else {
            console.log('Copied .eslintrc file.');
        }
    });

    fs.copyFile(targetConfigDir + 'webpack.config.js', projectDirFull + 'webpack.config.js', (webpackError) => {
        if (webpackError) {
            console.error('Error copying webpack.config.js file: ' + webpackError);
        } else {
            console.log('Copied webpack.config.js file.');
        }
    });

    fs.copyFile(targetConfigDir + 'target-package.json', projectDirFull + 'package.json', (packageError) => {
        if (packageError) {
            console.error('Error copying package.json file: ' + packageError);
        } else {
            console.log('Copied package.json file.');
        }
    });

    fs.copyFile(targetDocsDir + 'target-README.md', projectDirFull + 'README.md', (readmeError) => {
        if (readmeError) {
            console.error('Error copying README.md file: ' + readmeError);
        } else {
            console.log('Copied README.md file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-index.js', srcDirFull + 'index.js', (indexJsError) => {
        if (indexJsError) {
            console.error('Error copying index.js file: ' + indexJsError);
        } else {
            console.log('Copied index.js file.');
        }
    });

    fs.copyFile(targetSrcDir + 'target-index.html', srcDirFull + 'index.html', (indexHtmlError) => {
        if (indexHtmlError) {
            console.error('Error copying index.html file: ' + indexHtmlError);
        } else {
            console.log('Copied index.html file.');
        }
    });

    fs.copyFile(targetCssDir + 'pure-min.css', cssDirFull + 'pure-min.css', (cssError) => {
        if (cssError) {
            console.error('Error copying Pure.css CSS file: ' + cssError);
        } else {
            console.log('Copied Pure.css CSS file.');
        }
    });

    fs.copyFile(targetCssDir + 'target-styles.css', cssDirFull + 'styles.css', (cssError) => {
        if (cssError) {
            console.error('Error copying styles.css CSS file: ' + cssError);
        } else {
            console.log('Copied styles.css CSS file.');
        }
    });

    fs.copyFile(targetImageDir + 'favicon.png', imageDirFull + 'favicon.png', (faviconError) => {
        if (faviconError) {
            console.error('Error copying favicon.png file: ' + faviconError);
        } else {
            console.log('Copied favicon.png file.');
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
            console.error(error);
        });

    fsReadFile(projectDirFull + 'package.json')
        .then(jsonDataRaw => {
            const projectJson = JSON.parse(jsonDataRaw);

            projectJson.name = projectName.replace(/\s/g, '');

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
            console.error(error);
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
            console.error(error);
        });
}

async function createProjectStructure(projectName, addInternationalization) {
    console.log('Creating project structure for "' + projectName + '"...');

    if (addInternationalization === 'y') {
        createInternationalizationStructure(projectName);
    } else {
        createStandardStructure(projectName);
    }

    promptInterface.close();
}

console.log('Sling.js CLI v' + version);

promptInterface.question('? Name for project: ', projectName => {
    promptInterface.question('? Add internationalization (y/N): ', addInternationalization => createProjectStructure(projectName, addInternationalization));
});
