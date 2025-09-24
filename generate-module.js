// generate-module.js
const fs = require('fs');
const path = require('path');

const folderName = process.argv[2]; // pass folder name from CLI
if (!folderName) {
  console.error('❌ Please provide a folder name.');
  process.exit(1);
}

const baseDir = path.join(__dirname, 'src', 'modules', folderName);
const testDir = path.join(baseDir, `${folderName}.service.test`); // test folder

const files = [
  `${folderName}.controller.js`,
  `${folderName}.routes.js`,
  `${folderName}.table.js`,
  `index.js`,
  `${folderName}.queries.js`,
  `${folderName}.service.js`,
  `${folderName}.validator.js`,
];

const testFiles = [
  `${folderName}.service.test.js`, // service test file
];

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
  console.log(`📁 Created folder: ${baseDir}`);
}

files.forEach((file) => {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`📄 Created file: ${filePath}`);
  } else {
    console.log(`⚠️ File already exists: ${filePath}`);
  }
});

// Create test folder and files
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
  console.log(`📁 Created test folder: ${testDir}`);
}

testFiles.forEach((file) => {
  const filePath = path.join(testDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`📄 Created test file: ${filePath}`);
  } else {
    console.log(`⚠️ Test file already exists: ${filePath}`);
  }
});
