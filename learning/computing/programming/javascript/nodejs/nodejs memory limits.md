---
name: Nodejs Memory Limits
created: 2022-11-20T15:31:51-06:00
updated: 2022-11-20T15:40:31-06:00
aliases: 
tags: 
---
# Nodejs Memory Limits

By default 4gb

- No limit if you are using streams
  
## Increasing Heap Memory Limits

```shell
node --max-old-space-size=8192 app.js
```

## Keeping Track of Node.js Memory Leaks

```javascript
constpath=require("path");
constfs=require("fs");
constos=require("os");

conststart=Date.now();
constLOG_FILE= path.join(__dirname, "memory-usage.csv");

fs.writeFile(LOG_FILE, "Time Alive (secs),Memory GB"+ os.EOL, () => {}); // fire-and-forget

```

Gradual memory metrics should be stored over time

```javascript
constelapsedTimeInSecs= (Date.now() - start) /1000;
consttimeRounded=Math.round(elapsedTimeInSecs *100) /100;

s.appendFile(LOG_FILE, timeRounded +","+ gbRounded + os.EOL, () => {}); // fire-and-forget

```

Append to a file on a specific interval
```javascript
setInterval(() => {
constmu= process.memoryUsage();
// # bytes / KB / MB / GB
constgbNow= mu[field] /1024/1024/1024;
constgbRounded=Math.round(gbNow *100) /100;

constelapsedTimeInSecs= (Date.now() - start) /1000;
consttimeRounded=Math.round(elapsedTimeInSecs *100) /100;

  fs.appendFile(LOG_FILE, timeRounded +","+ gbRounded + os.EOL, () => {}); // fire-and-forget
}, TIME_INTERVAL_IN_MSEC);

```

Plug this into Excel or something that can help visualize csv metrics

> In production you'd want to use a wrapper process like pm2 or similar 