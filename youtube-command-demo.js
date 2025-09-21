#!/usr/bin/env node

// Demo version with mock data to showcase functionality without external dependencies

class YouTubeAnalyzer {
  constructor() {
    // Mock data representing a typical tech channel's recent videos
    this.mockData = {
      '@veritasium': {
        channelName: 'Veritasium',
        videos: [
          {
            title: "Why 4 Billion People Can't Get On The Internet",
            url: "https://www.youtube.com/watch?v=abc123",
            views: 2847000,
            duration: "13:42",
            durationSeconds: 822,
            publishDate: new Date("2024-09-10")
          },
          {
            title: "The Trillion Dollar Equation",
            url: "https://www.youtube.com/watch?v=def456",
            views: 3156000,
            duration: "18:24",
            durationSeconds: 1104,
            publishDate: new Date("2024-09-03")
          },
          {
            title: "How Did NASA Steer The Saturn V?",
            url: "https://www.youtube.com/watch?v=ghi789",
            views: 1972000,
            duration: "16:31",
            durationSeconds: 991,
            publishDate: new Date("2024-08-27")
          },
          {
            title: "What Actually Happened at Area 51?",
            url: "https://www.youtube.com/watch?v=jkl012",
            views: 4521000,
            duration: "21:15",
            durationSeconds: 1275,
            publishDate: new Date("2024-08-20")
          },
          {
            title: "The Science of Catching Up",
            url: "https://www.youtube.com/watch?v=mno345",
            views: 892000,
            duration: "12:08",
            durationSeconds: 728,
            publishDate: new Date("2024-08-13")
          },
          {
            title: "Why Democracy Is Mathematically Impossible",
            url: "https://www.youtube.com/watch?v=pqr678",
            views: 2134000,
            duration: "19:47",
            durationSeconds: 1187,
            publishDate: new Date("2024-08-06")
          },
          {
            title: "How Quantum Computers Work",
            url: "https://www.youtube.com/watch?v=stu901",
            views: 3892000,
            duration: "22:33",
            durationSeconds: 1353,
            publishDate: new Date("2024-07-30")
          },
          {
            title: "The Real Reason Ships Don't Sink",
            url: "https://www.youtube.com/watch?v=vwx234",
            views: 1567000,
            duration: "14:56",
            durationSeconds: 896,
            publishDate: new Date("2024-07-23")
          },
          {
            title: "Why You Can Never Reach The Speed of Light",
            url: "https://www.youtube.com/watch?v=yza567",
            views: 5123000,
            duration: "17:29",
            durationSeconds: 1049,
            publishDate: new Date("2024-07-16")
          },
          {
            title: "The Impossible Engineering of Skyscrapers",
            url: "https://www.youtube.com/watch?v=bcd890",
            views: 2789000,
            duration: "20:11",
            durationSeconds: 1211,
            publishDate: new Date("2024-07-09")
          }
        ]
      }
    };
  }

  async analyzeChannel(channelInput) {
    try {
      console.log(`Analyzing channel: ${channelInput}`);
      console.log('(Using demo data - in production this would fetch real YouTube data)');

      // Get mock data
      const channelData = this.getMockData(channelInput);

      // Step 1: Select top 10 by views
      const topVideos = this.selectTopVideos(channelData);

      // Step 2: Generate insights and suggestions
      const insights = this.generateInsights(channelData);
      const suggestions = this.generateSuggestions(topVideos);

      // Step 3: Format output
      return this.formatOutput(channelInput, topVideos, insights, suggestions);

    } catch (error) {
      return this.handleError(error);
    }
  }

  getMockData(channelInput) {
    const key = channelInput.toLowerCase();
    if (this.mockData[key]) {
      return this.mockData[key];
    }

    // Default mock data for any other channel
    return {
      channelName: 'Demo Channel',
      videos: [
        {
          title: "How to Build Amazing Things",
          url: "https://www.youtube.com/watch?v=demo1",
          views: 150000,
          duration: "10:30",
          durationSeconds: 630,
          publishDate: new Date()
        },
        {
          title: "The Secret Behind Success",
          url: "https://www.youtube.com/watch?v=demo2",
          views: 89000,
          duration: "8:45",
          durationSeconds: 525,
          publishDate: new Date()
        }
      ]
    };
  }

  selectTopVideos(channelData) {
    return channelData.videos
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  generateInsights(channelData) {
    const videos = channelData.videos;

    if (videos.length === 0) {
      return {
        topPattern: 'Insufficient data for analysis',
        optimalDuration: 'Unknown',
        viewRange: 'No data available',
        trend: 'Unable to determine'
      };
    }

    // Calculate insights
    const views = videos.map(v => v.views).sort((a, b) => b - a);
    const durations = videos.map(v => v.durationSeconds).filter(d => d > 0);

    // Top performing content pattern
    const topVideos = videos.sort((a, b) => b.views - a.views).slice(0, 3);
    const commonWords = this.extractCommonWords(topVideos.map(v => v.title));

    // Duration analysis
    const avgTopDuration = topVideos.reduce((sum, v) => sum + v.durationSeconds, 0) / topVideos.length;

    return {
      topPattern: commonWords.length > 0 ? `Science and engineering content featuring "${commonWords[0]}" performs exceptionally well` : 'Educational content performs consistently',
      optimalDuration: `${this.formatDuration(Math.floor(avgTopDuration))} average for top performers`,
      viewRange: `${this.formatViewCount(Math.min(...views))} - ${this.formatViewCount(Math.max(...views))} views`,
      trend: 'Strong consistent performance with educational content averaging 2.8M views',
      avgViews: Math.floor(views.reduce((sum, v) => sum + v, 0) / views.length)
    };
  }

  generateSuggestions(topVideos) {
    if (topVideos.length === 0) {
      return ['Create engaging content based on your audience interests'];
    }

    const titles = topVideos.slice(0, 5).map(v => v.title);
    const patterns = this.analyzeSuccessfulPatterns(titles);

    return [
      `${patterns.format}: [Your Science Topic Here]`,
      `${patterns.style} Your Next [Physics/Engineering Concept]`,
      `Follow-up to your top performer: "${topVideos[0].title.substring(0, 40)}..."`
    ];
  }

  analyzeSuccessfulPatterns(titles) {
    // Pattern analysis for educational content
    const hasWhy = titles.some(t => t.toLowerCase().includes('why'));
    const hasHow = titles.some(t => t.toLowerCase().includes('how'));
    const hasWhat = titles.some(t => t.toLowerCase().includes('what'));
    const hasScience = titles.some(t => t.toLowerCase().includes('science') || t.toLowerCase().includes('quantum') || t.toLowerCase().includes('impossible'));

    if (hasWhy) return { format: 'Why', style: 'Deep explanation of' };
    if (hasHow) return { format: 'How', style: 'Technical breakdown of' };
    if (hasWhat) return { format: 'What Actually', style: 'Myth-busting content about' };
    if (hasScience) return { format: 'The Science of', style: 'Scientific analysis of' };

    return { format: 'The Real Story Behind', style: 'Educational content about' };
  }

  extractCommonWords(titles) {
    const words = titles.join(' ').toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .filter(word => !['this', 'that', 'with', 'from', 'they', 'were', 'been', 'have', 'their', 'said', 'each', 'which', 'what', 'when', 'where', 'will', 'more', 'very', 'like', 'just', 'than', 'only', 'over', 'also', 'back', 'after', 'first', 'well', 'many', 'some', 'time', 'year', 'work', 'good', 'much', 'most', 'many'].includes(word));

    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .filter(([word, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatViewCount(views) {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  formatOutput(channelInput, topVideos, insights, suggestions) {
    const timestamp = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let output = `# YouTube Channel Analysis: ${channelInput}\n\n`;

    // Key Insights
    output += `## Key Insights\n`;
    output += `- **Top Performance Pattern**: ${insights.topPattern}\n`;
    output += `- **Optimal Duration**: ${insights.optimalDuration}\n`;
    output += `- **View Range**: ${insights.viewRange}\n`;
    output += `- **Performance Trend**: ${insights.trend}\n\n`;

    // Your Next Video
    output += `## Your Next Video\n`;
    output += `Based on top performers, consider these title approaches:\n`;
    suggestions.forEach(suggestion => {
      output += `- ${suggestion}\n`;
    });
    output += `\n`;

    // Top 10 Videos
    output += `## Top 10 Videos by Views\n\n`;
    topVideos.forEach((video, index) => {
      output += `${index + 1}. **${video.title}** - ${this.formatViewCount(video.views)} views | ${video.duration} | ${video.url}\n`;
    });

    output += `\n---\n`;
    output += `*Analysis generated on ${timestamp}*\n`;
    output += `*Demo version - Replace with real YouTube API integration for production use*\n`;

    return output;
  }

  handleError(error) {
    return `Error analyzing channel: ${error.message}`;
  }
}

// Command line interface
async function main() {
  const fs = require('fs').promises;
  const path = require('path');
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node youtube-command-demo.js <channel>');
    console.log('Examples:');
    console.log('  node youtube-command-demo.js @veritasium');
    console.log('  node youtube-command-demo.js @anychannel');
    console.log('');
    console.log('Note: This is a demo version using mock data.');
    console.log('For production, integrate with real YouTube data sources.');
    process.exit(1);
  }

  const channelInput = args[0];
  const analyzer = new YouTubeAnalyzer();

  try {
    const result = await analyzer.analyzeChannel(channelInput);

    // Generate filename based on channel name and timestamp
    const sanitizedChannel = channelInput.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `youtube_analysis_${sanitizedChannel}_${timestamp}.md`;

    // Save to markdown file
    await fs.writeFile(filename, result);

    console.log(`\nAnalysis complete! Results saved to: ${filename}`);
    console.log('\nPreview:');
    console.log(result.split('\n').slice(0, 10).join('\n') + '\n...');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Export for use as module
module.exports = YouTubeAnalyzer;

// Run if called directly
if (require.main === module) {
  main();
}