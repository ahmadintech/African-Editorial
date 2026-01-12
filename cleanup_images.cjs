const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

const targetDir = path.resolve(__dirname, 'resources/js');

walk(targetDir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Process <img> tags
        content = content.replace(/<img([\s\S]*?)\/>/g, (match, p1) => {
            let attrs = p1.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            let isFill = / fill(\s|>|$)/.test(attrs);
            let classNames = [];

            // Extract existing classNames
            attrs = attrs.replace(/className=(?:"|'|{`|{)([\s\S]*?)(?:"|'|`}|})/g, (m, c) => {
                classNames.push(c.trim());
                return '';
            });

            if (isFill) {
                classNames.push('w-full h-full absolute inset-0 object-cover');
                attrs = attrs.replace(/\bfill\b/g, '');
            }

            // Remove other Next.js props
            attrs = attrs.replace(/\bpriority\b/g, '');
            attrs = attrs.replace(/sizes=".*?"/g, '');
            attrs = attrs.replace(/loading=".*?"/g, '');

            // Merge and deduplicate classNames
            let flatClasses = classNames.join(' ').split(/\s+/);
            let uniqueClasses = [...new Set(flatClasses)].filter(Boolean).join(' ');

            if (uniqueClasses) {
                return `<img ${attrs.trim()} className="${uniqueClasses}" />`;
            } else {
                return `<img ${attrs.trim()} />`;
            }
        });

        // Clean up redundant const Image 
        content = content.replace(/const Image = \({src, alt, \.\.\.props}\) => <img src={src} alt={alt} {\.\.\.props} \/>/g, '');

        // Fix double spaces
        content = content.replace(/  +/g, ' ');

        fs.writeFileSync(filePath, content);
    }
});
