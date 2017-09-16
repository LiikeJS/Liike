const cp = require('child_process');

const run = cmd => cp.spawn('npm', ['run', cmd], { stdio: 'inherit' });

run('build-dev');
run('build');
run('example');
