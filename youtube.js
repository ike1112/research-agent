#!/usr/bin/env node

/**
 * YouTube Channel Analysis Command
 *
 * This is the main entry point for the /youtube slash command.
 * It wraps the youtube-command-demo.js with simplified usage.
 */

const YouTubeAnalyzer = require('./youtube-command-demo.js');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: /youtube @channelname');
    console.log('');
    console.log('Examples:');
    console.log('  /youtube @veritasium');
    console.log('  /youtube https://www.youtube.com/@veritasium');
    console.log('  /youtube UCHnyfMqiRRG1u-2MsSQLbXA');
    console.log('');
    console.log('This command analyzes YouTube channel performance and provides content insights.');
    return;
  }

  const channelInput = args.join(' ');
  const analyzer = new YouTubeAnalyzer();

  try {
    console.log('🔍 Analyzing YouTube channel...\n');
    const result = await analyzer.analyzeChannel(channelInput);
    console.log(result);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}