const express = require("express");
const connectDB = require("./config/db");
const cors=require("cors")
const app = express();
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
connectDB();
app.use(cors());



// const UrlStore = require("./models/url.model");
// const { v4: uuidv4 } = require("uuid");
// function addHours(hours) {
//   const currentTimestamp = Date.now();
//   const currentDate = new Date(currentTimestamp);
//   currentDate.setTime(currentDate.getTime() + hours * 60 * 60 * 1000);
//   return currentDate;
// }
// app.post("/create", async (req, res) => {
//   const { url, timeLimit } = req.body;
//   try {
//     const urlDb = await UrlStore.findOne({ originalUrl: url });
//     if (urlDb === null) {
//       const unique = uuidv4().substring(0, 8);
//       const shortUrl = new UrlStore({
//         originalUrl: url,
//         hashedUrl: unique,
//         expiresIn: addHours(timeLimit),
//       });
//       const result = await shortUrl.save();
//       res.send(result);
//     } else {
//       const result = await UrlStore.findOneAndUpdate(
//         { originalUrl: url },
//         { expiresIn: (timeLimit) }
//       );
      
//       res.send(result);
//     }
//   } catch (error) {}
// });
// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await UrlStore.findOne({ hashedUrl: id });
//     if (result === null) {
//       res.status(401).send({ message: "Url not available/expired" });
//     } else {
//       res.send({url:result.originalUrl});
//       result.clickCount = result.clickCount + 1;
//       result.save();
//     }
//   } catch (error) {
//     res.status(501).send({ message: "Internal server errror" });
//   }
// });
// app.post("/check", async (req, res) => {
//   try {
//     const { url } = req.body;
//     console.log(url.substring(process.env.BASE_URL.length));
    
//     const result = await UrlStore.findOne({ hashedUrl: url.substring(process.env.BASE_URL.length+1)});
//     if (result === null) {
//       res.status(401).send({ message: "Url not available/expired" });
//     } else {
//       res.send({ count: result.clickCount });
//     }
//   } catch (error) {
//     res.status(501).send({ message: "Internal Server Error" });
//   }
// });
app.use('/user',require('./routes/user.routes'));
app.use('/',require('./routes/url.routes'))
app.get("/",(req,res)=>{
  res.send("heelo")
})
app.listen(8080, () => {
  console.log("Server Started Successfull at https://localhost:8080");
}); 
