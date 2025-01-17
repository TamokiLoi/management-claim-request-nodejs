import glob from 'glob';

const apiPaths =
    process.env.NODE_ENV === 'production'
        ? './dist/modules/**/*.route.js'
        : './src/modules/**/*.route.ts';

console.log('Checking API paths:', apiPaths);

glob(apiPaths, (err: any, files: any) => {
    if (err) {
        console.error('Error while searching files:', err);
    } else if (!files.length) {
        console.warn('No files found!');
    } else {
        console.log('Found files:', files);
    }
});
