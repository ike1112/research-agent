# YouTube Channel Analyzer

A command-line tool that analyzes YouTube channel performance by fetching recent videos, identifying top performers, and providing actionable insights for content creators.

## Features

- **Channel Analysis**: Analyzes any public YouTube channel
- **Top 10 Rankings**: Shows the most viewed videos from recent uploads
- **Performance Insights**: Identifies successful content patterns and optimal video length
- **Content Suggestions**: Generates title recommendations based on top performers
- **Multiple Input Formats**: Supports @username, channel URLs, and channel IDs

## Installation

```bash
npm install
```

## Usage

### Demo Version (Recommended for Testing)
```bash
node youtube-command-demo.js @channelname
```

### Production Version (Requires YouTube Data Setup)
```bash
node youtube-command.js @channelname
```

### Examples
```bash
# Using @username format
node youtube-command-demo.js @veritasium

# Using channel URL
node youtube-command-demo.js https://www.youtube.com/@veritasium

# Using channel ID
node youtube-command-demo.js UCHnyfMqiRRG1u-2MsSQLbXA
```

## Output Format

The tool generates a comprehensive markdown report including:

### Key Insights
- Top performance patterns
- Optimal video duration for the channel
- View count ranges
- Performance trends

### Your Next Video
- 3 title suggestions based on successful patterns
- Content direction recommendations

### Top 10 Videos by Views
- Ranked list with titles, view counts, duration, and YouTube links
- Clickable URLs for easy access

## Example Output

```markdown
# YouTube Channel Analysis: @veritasium

## Key Insights
- **Top Performance Pattern**: Science and engineering content featuring "science" performs exceptionally well
- **Optimal Duration**: 20:25 average for top performers
- **View Range**: 892.0K - 5.1M views
- **Performance Trend**: Strong consistent performance with educational content averaging 2.8M views

## Your Next Video
Based on top performers, consider these title approaches:
- Why: [Your Science Topic Here]
- Deep explanation of Your Next [Physics/Engineering Concept]
- Follow-up to your top performer: "Why You Can Never Reach The Speed of Lig..."

## Top 10 Videos by Views

1. **Why You Can Never Reach The Speed of Light** - 5.1M views | 17:29 | https://www.youtube.com/watch?v=yza567
2. **What Actually Happened at Area 51?** - 4.5M views | 21:15 | https://www.youtube.com/watch?v=jkl012
3. **How Quantum Computers Work** - 3.9M views | 22:33 | https://www.youtube.com/watch?v=stu901
...
```

## Implementation Details

### Current Status
- ✅ **Demo Version**: Fully functional with realistic mock data
- ✅ **Core Algorithm**: Complete analysis engine for insights and suggestions
- ✅ **Output Formatting**: Professional markdown formatting with clickable links
- ⚠️ **Production Version**: Requires YouTube data source setup (see below)

### For Production Use

To enable real YouTube data fetching, you'll need to set up one of these options:

1. **YouTube Data API v3** (Recommended for high-volume use)
   - Requires API key from Google Cloud Console
   - Has quota limits but very reliable
   - Modify `youtube-command.js` to use official API

2. **yt-dlp Integration** (Current implementation)
   - Requires yt-dlp binary installation
   - No API keys needed but slower
   - May need periodic updates for YouTube changes

3. **Alternative Libraries**
   - ytdl-core for individual videos
   - Custom scraping solutions

### Files Structure

- `youtube-command-demo.js` - Demo version with mock data (recommended for testing)
- `youtube-command.js` - Production version with ytpl/ytdl-core (needs fixes)
- `youtube-command-v2.js` - yt-dlp version (requires yt-dlp installation)
- `spec/youtube-command-spec.md` - Detailed specification
- `youtube-command-todo.md` - Implementation checklist

## Dependencies

- **Node.js**: Runtime environment
- **ytpl**: Channel video listing (deprecated, needs replacement)
- **ytdl-core**: Video metadata extraction
- **yt-dlp-wrap**: Alternative YouTube data extraction

## Error Handling

The tool gracefully handles:
- Channel not found errors
- Private/restricted content
- Rate limiting
- Network timeouts
- Insufficient data scenarios

## Performance Considerations

- Rate limiting between requests to avoid YouTube throttling
- Concurrent request limiting
- Error recovery for individual video failures
- Caching for recently analyzed channels

## Future Enhancements

- Real-time YouTube API integration
- Historical performance tracking
- Competitor comparison features
- Export to CSV/JSON formats
- Slack/Discord bot integration

---

*Built according to the specification in `/spec/youtube-command-spec.md`*