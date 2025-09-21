#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

/**
 * YouTube Channel Analysis Slash Command
 * Usage: /youtube @channelname
 */

async function executeYouTubeCommand(args) {
  if (args.length === 0) {
    return {
      success: false,
      message: `Usage: /youtube @channelname

Examples:
  /youtube @veritasium
  /youtube https://www.youtube.com/@veritasium
  /youtube UCHnyfMqiRRG1u-2MsSQLbXA

Analyzes YouTube channel performance and provides content insights.`
    };
  }

  const channelInput = args.join(' ');
  const scriptPath = path.join(__dirname, '..', '..', 'youtube-command-demo.js');

  return new Promise((resolve) => {
    const child = spawn('node', [scriptPath, channelInput], {
      cwd: path.join(__dirname, '..', '..'),
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          message: stdout
        });
      } else {
        resolve({
          success: false,
          message: `Error analyzing channel: ${stderr || 'Unknown error'}`
        });
      }
    });

    child.on('error', (error) => {
      resolve({
        success: false,
        message: `Failed to execute command: ${error.message}`
      });
    });

    // Set timeout
    setTimeout(() => {
      child.kill();
      resolve({
        success: false,
        message: 'Command timed out after 30 seconds'
      });
    }, 30000);
  });
}

module.exports = {
  name: 'youtube',
  description: 'Analyze YouTube channel performance and get content insights',
  usage: '/youtube @channelname',
  execute: executeYouTubeCommand
};

// If called directly from command line
if (require.main === module) {
  const args = process.argv.slice(2);
  executeYouTubeCommand(args).then(result => {
    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
      process.exit(1);
    }
  });
}