const fs = require('fs');
const path = require('path');
require('dotenv').config();

const gaBlock = `
<script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
</script>
`;

const inputDir = __dirname;
const outputDir = path.join(__dirname, '_site');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = ['index.html', 'generic.html', 'elements.html', 'resume.html', 'Directory.html'];
files.forEach(file => {
  const filePath = path.join(inputDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace('<!-- GOOGLE_ANALYTICS_BLOCK -->', gaBlock);
    fs.writeFileSync(path.join(outputDir, file), content);
  }
});

// Copy assets and images folders to _site for CSS/JS/images
function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const file of fs.readdirSync(from)) {
    const src = path.join(from, file);
    const dest = path.join(to, file);
    if (fs.lstatSync(src).isDirectory()) {
      copyFolderSync(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

copyFolderSync(path.join(inputDir, 'assets'), path.join(outputDir, 'assets'));
copyFolderSync(path.join(inputDir, 'images'), path.join(outputDir, 'images'));

// Copy resume files to _site
const resumeFiles = ['0_Jay Blankenship Resume.pdf', '0_Jay Blankenship Resume.docx'];
for (const file of resumeFiles) {
  const src = path.join(inputDir, file);
  const dest = path.join(outputDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}
