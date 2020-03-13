let express = require("express");
let path = require("path");
let app = express();

const expressHbs = require("express-handlebars");

app.use(express.static(path.join(__dirname, "/public")));

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", function(req, res) {
  res.render("home", {
    pageTitle: "Knowledge Base",
    heading: "Welcome to kbase"
  });
});

// app.get("/if", function(req, res) {
//   res.render("if", { condition: true });
// });

// app.get("/eachArray", function(req, res) {
//   res.render("eachArray", { likes: ["Sleeping", "Walking", "Exercising"] });
// });

// app.get("/eachObject", function(req, res) {
//   res.render("eachObject", {
//     artist: {
//       name: "Roy",
//       about: "Best in town",
//       imageUrl: "https://randomuser.me/api/portraits/med/women/2.jpg"
//     }
//   });
// });

// app.get("/eachArrayObjects", function(req, res) {
//   res.render("eachArrayObjects", {
//     artist: [
//       {
//         name: "Roy",
//         about: "2019 Hottest Star",
//         imageUrl: "https://randomuser.me/api/portraits/med/men/1.jpg"
//       },
//       {
//         name: "Kevin",
//         about: "Best in town",
//         imageUrl: "https://randomuser.me/api/portraits/med/men/2.jpg"
//       },
//       {
//         name: "Joe",
//         about: "Rising star",
//         imageUrl: "https://randomuser.me/api/portraits/med/men/3.jpg"
//       }
//     ]
//   });
// });

// app.get("/partial", function(req, res) {
//   res.render("partial", { data: "Data via view" });
// });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server ready on ${PORT}`));
