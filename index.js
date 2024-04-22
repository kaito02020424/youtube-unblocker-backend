const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,"./html/search.html"))
});
app.get('/results', async (req,res) => {
  if (req.query["search_query"] == undefined) return res.status(400).send("ERROR!!\nyou must set the search param.")
  const searchText = encodeURIComponent(req.query["search_query"])
  const youtubeData = await (await fetch(`https://www.youtube.com/results?search_query=${searchText}`)).text()
  res.send(youtubeData)
})
app.get('/watch', async (req,res) => {
  const videoId = req.query["v"]
  if (videoId == undefined) return res.status(400).send("ERROR!!\nyou must set the search param.")
  const reg = new RegExp(/VIDEO_ID/g)
  const content = (await fs.readFile("./html/video.html")).toString().replace(reg,videoId)
  res.send(content)
})

app
.listen(3000, () => {
  console.log('Server listening on port 3000');
})
.on("error", (e) => {
  console.error(e)
})