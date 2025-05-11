const { spawn } = require('child_process');
const path = require('path');

function startServer() {
    // Use Next.js dev server instead of production
    const nextServer = spawn('node', [
        path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'),
        'dev'
    ], {
        windowsHide: true,
        cwd: __dirname,
        stdio: 'pipe',
        env: { ...process.env, NODE_ENV: 'development' }
    });

    nextServer.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    nextServer.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    nextServer.on('error', (error) => {
        console.error('Server error:', error);
        setTimeout(startServer, 1000);
    });

    nextServer.on('close', (code) => {
        console.log(`Server exited with code ${code}`);
        if (code !== 0) {
            console.log('Server crashed, restarting...');
            setTimeout(startServer, 1000);
        }
    });

    // Handle various termination signals
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
        process.on(signal, () => {
            console.log(`Received ${signal}, shutting down...`);
            nextServer.kill();
            process.exit(0);
        });
    });
}

startServer(); 