# /youtube Command Specification

## Overview
A custom slash command that analyzes YouTube channel performance by fetching recent videos, identifying top performers by view count, and providing actionable insights for content creators.

## Command Syntax
```
/youtube @channelname
/youtube https://www.youtube.com/channel/CHANNEL_ID
/youtube https://www.youtube.com/@channelname
```

## Technical Implementation

### Dependencies
- **ytpl**: Channel/playlist video extraction
- **ytdl-core**: Individual video metadata retrieval
- **Node.js**: Runtime environment

### Data Processing Workflow
1. **Fetch Recent Videos**: Extract 20 most recent videos from target channel
2. **Gather Metadata**: For each video, collect title, views, duration, publish date, URL
3. **Rank by Performance**: Sort videos by view count (descending)
4. **Analyze Patterns**: Identify performance trends and content insights
5. **Generate Suggestions**: Create title recommendations based on top performers

### Core Functionality
```javascript
// Pseudo-code implementation
async function executeYouTubeCommand(channelInput) {
  const channelVideos = await ytpl(channelId, { limit: 20 });
  const enrichedVideos = await Promise.all(
    channelVideos.items.map(async (video) => {
      const info = await ytdl.getInfo(video.shortUrl);
      return {
        title: video.title,
        url: video.shortUrl,
        views: parseInt(info.videoDetails.viewCount),
        duration: info.videoDetails.lengthSeconds,
        publishDate: new Date(video.uploadedAt)
      };
    })
  );

  const topVideos = enrichedVideos
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return generateReport(topVideos, enrichedVideos);
}
```

## Output Format

### Complete Output Structure
```markdown
# YouTube Channel Analysis: [Channel Name]

## Key Insights
- **Top Performance Pattern**: [Most successful video type/topic]
- **Optimal Duration**: [Duration range of top performers]
- **Content Timing**: [Best performing upload days/times if detectable]
- **View Range**: [Range from lowest to highest performing video]
- **Engagement Trend**: [General performance trajectory]

## Your Next Video
Based on top performers, consider these title approaches:
- [Title suggestion 1 based on successful pattern]
- [Title suggestion 2 based on successful pattern]
- [Title suggestion 3 based on successful pattern]

## Top 10 Videos by Views

1. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
2. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
3. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
4. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
5. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
6. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
7. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
8. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
9. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]
10. **[Video Title]** - [formatted view count] views | [duration] | [YouTube URL]

---
*Analysis generated on [timestamp]*
```

### Example Output
```markdown
# YouTube Channel Analysis: TechReviewChannel

## Key Insights
- **Top Performance Pattern**: Product unboxing videos consistently outperform tutorials
- **Optimal Duration**: 8-12 minute videos generate highest engagement
- **Content Timing**: Tuesday uploads show 23% higher average views
- **View Range**: 15K - 250K views across recent content
- **Engagement Trend**: Steady growth with 15% increase in average views over last month

## Your Next Video
Based on top performers, consider these title approaches:
- "Unboxing the [Latest Product]: First Impressions & Setup"
- "Is [Product Name] Worth It? Honest Review After 30 Days"
- "Setup Guide: Getting Started with [Popular Product]"

## Top 10 Videos by Views

1. **iPhone 15 Pro Unboxing: First 24 Hours** - 247K views | 9:23 | https://youtu.be/abc123
2. **MacBook Air M2 Review: 6 Months Later** - 186K views | 11:45 | https://youtu.be/def456
3. **AirPods Pro 2 vs Sony WH-1000XM5** - 162K views | 8:12 | https://youtu.be/ghi789
4. **iPad Air Setup: Perfect for Students** - 134K views | 7:56 | https://youtu.be/jkl012
5. **Tesla Model Y: Tech Features Tour** - 128K views | 12:34 | https://youtu.be/mno345
6. **Apple Watch Ultra: Extreme Testing** - 119K views | 10:18 | https://youtu.be/pqr678
7. **HomePod vs Sonos: Sound Comparison** - 98K views | 6:43 | https://youtu.be/stu901
8. **iPhone 14 vs iPhone 15: Upgrade Guide** - 87K views | 9:01 | https://youtu.be/vwx234
9. **Mac Studio Review: Creative Powerhouse** - 76K views | 13:22 | https://youtu.be/yz567
10. **AirTags: Everything You Need to Know** - 64K views | 5:47 | https://youtu.be/abc890

---
*Analysis generated on September 17, 2024 at 2:30 PM*
```

## Key Features

### Data Points Collected
- Video title
- View count (formatted with K/M suffixes)
- Video duration (MM:SS format)
- Clickable YouTube URL
- Upload date (for analysis)

### Analysis Components

#### Key Insights Section
- **Performance Patterns**: Identifies content types that consistently perform well
- **Duration Analysis**: Optimal video length based on view data
- **Timing Insights**: Best performing upload patterns (if detectable)
- **View Distribution**: Range and average performance metrics
- **Growth Trends**: Performance trajectory over recent uploads

#### Your Next Video Section
- **Title Suggestions**: 3 specific title recommendations based on top performer patterns
- **Content Direction**: Strategic guidance derived from successful video analysis
- **Format Recommendations**: Suggested video styles/approaches

### Output Formatting
- **Markdown Format**: Clean, readable structure
- **Clickable Links**: Direct YouTube URLs for easy access
- **View Count Formatting**: Human-readable numbers (1.2K, 15K, 1.2M)
- **Duration Display**: Standard MM:SS format
- **Consistent Structure**: Predictable layout for easy scanning

## Error Handling

### Channel Not Found
```
Error: Channel '@channelname' not found. Please verify:
- Channel name spelling
- Channel exists and is public
- Try using full channel URL instead
```

### Rate Limiting
```
Warning: YouTube temporarily limiting requests. Retrying in 30 seconds...
```

### Private/Restricted Content
```
Notice: Some videos may be excluded due to privacy settings or regional restrictions.
Showing available public content only.
```

### Insufficient Data
```
Warning: Channel has fewer than 20 recent videos. Showing all available content.
Analysis based on [X] videos may be less comprehensive.
```

## Performance Considerations
- **Concurrent Requests**: Limit parallel video metadata requests to avoid rate limiting
- **Caching**: Implement temporary caching for recently analyzed channels
- **Timeout Handling**: Set reasonable timeouts for video data extraction
- **Error Recovery**: Gracefully handle individual video fetch failures

## Future Enhancements
- Support for playlist analysis
- Historical performance tracking
- Competitor comparison features
- Export to CSV/JSON formats
- Integration with YouTube Analytics (when API keys available)

---
*Specification version 1.0*