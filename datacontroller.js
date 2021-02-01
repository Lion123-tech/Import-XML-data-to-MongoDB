const data = require('./datamodel');
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const localstore = require('localStorage');
let display = "";
//to store data
exports.store = (req, res) => {
    console.log(req.body.files)
  if (req.body.files==""||req.body.files==undefined) {
    res.render("page", {
      display: "block",
      Errordis: "File not uploaded!"
    })
  } else {
      
    const wb = xlsx.readFile(req.body.files);
    const ws = wb.Sheets["Sheet1"];
    const datas = xlsx.utils.sheet_to_json(ws);
    data.create(datas,
        (err, result) => {
      if (err)
        console.log("Error" + err);
      else {
        datas.forEach(element => {
          display += "<tr><td>" + element.Roll_no + "</td><td>" + element.Name + "</td><td>" + element.Class + "</td></tr>";
        });
        res.render("table", {
          display: "none",
          table: display
        });
      }
    });
  }

}
//to get data when asked from table
exports.getdata1 = (req, res) => {
  let single = true;
  let datas = {};
  if (req.body.name == "" && req.body.rollno == "") {
    res.render("table", {
      display: "block",
      Errordis: "Please enter name and Roll number!!",
      table: display
    });
  } else if (req.body.name != "" && req.body.rollno != "") {
    datas = {
      Name: req.body.name,
      Roll_no: req.body.rollno
    };
  } else if (req.body.name != "") {
    single = false;
    datas = {
      Name: req.body.name
    }
  } else {
    datas = {
      Roll_no: req.body.rollno
    };
  }
  if (single) {
    data.findOne(datas, (err, result) => {
      if (err)
        console.log(err);
      else {
        if (result == "" || !result) {
          res.render("table", {
            display: "block",
            Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
            table: display
          });
        } else {
          display = "";
          display += "<tr><td>" + result.Roll_no + "</td><td>" + result.Name + "</td><td>" + result.Class + "</td></tr>";
          res.render("single", {
            display: "none",
            table: display
          });
        }
      }
    });
  } else {
    data.find(datas, (err, result) => {
      if (err)
        console.log(err);
      if (result == "" || !result) {
        console.log("no!! data not found");

        console.log(display);
        res.render("table", {
          display: "block",
          Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
          table: display
        });
      } else {
        display = "";
        result.forEach(element => {
          display += "<tr><td>" + element.Roll_no + "</td><td>" + element.Name + "</td><td>" + element.Class + "</td></tr>";
        });
        res.render("multiple", {
          display: "none",
          table: display
        });
      }
    });

  }



}



//to get data when asked from single
exports.getdata2 = (req, res) => {
  let single = true;
  let datas = {};
  console.log(req.body.name+","+req.body.rollno);
  if (req.body.name == "" && req.body.rollno == "") {
    res.render("single", {
      display: "block",
      Errordis: "Please enter name and Roll number!!",
      table: display
    });
  } else if (req.body.name != "" && req.body.rollno != "") {
    datas = {
      Name: req.body.name,
      Roll_no: req.body.rollno
    };
  } else if (req.body.name != "") {
    single = false;
    datas = {
      Name: req.body.name
    }
  } else {
    datas = {
      Roll_no: req.body.rollno
    };
  }
  if (single) {
    data.findOne(datas, (err, result) => {
      if (err)
        console.log(err);
      else {
        if (result == "" || !result) {
          res.render("single", {
            display: "block",
            Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
            table: display
          });
        } else {
          display = "";
          display += "<tr><td>" + result.Roll_no + "</td><td>" + result.Name + "</td><td>" + result.Class + "</td></tr>";
          res.render("single", {
            display: "none",
            table: display
          });
        }
      }
    });
  } else {
    data.find(datas, (err, result) => {
      if (err)
        console.log(err);
      if (result == "" || !result) {
        console.log("no!! data not found");

        console.log(display);
        res.render("table", {
          display: "block",
          Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
          table: display
        });
      } else {
        display = "";
        result.forEach(element => {
          display += "<tr><td>" + element.Roll_no + "</td><td>" + element.Name + "</td><td>" + element.Class + "</td></tr>";
        });
        res.render("multiple", {
          display: "none",
          table: display
        });
      }
    });

  }



}

//to get data when asked from multiple
exports.getdata3 = (req, res) => {
  let single = true;
  let datas = {};
  if (req.body.name == "" && req.body.rollno == "") {
    res.render("multiple", {
      display: "block",
      Errordis: "Please enter name and Roll number!!",
      table: display
    });
  } else if (req.body.name != "" && req.body.rollno != "") {
    datas = {
      Name: req.body.name,
      Roll_no: req.body.rollno
    };
  } else if (req.body.name != "") {
    single = false;
    datas = {
      Name: req.body.name
    }
  } else {
    datas = {
      Roll_no: req.body.rollno
    };
  }
  if (single) {
    data.findOne(datas, (err, result) => {
      if (err)
        console.log(err);
      else {
        if (result == "" || !result) {
          res.render("multiple", {
            display: "block",
            Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
            table: display
          });
        } else {
          display = "";
          display += "<tr><td>" + result.Roll_no + "</td><td>" + result.Name + "</td><td>" + result.Class + "</td></tr>";
          res.render("single", {
            display: "none",
            table: display
          });
        }
      }
    });
  } else {
    data.find(datas, (err, result) => {
      if (err)
        console.log(err);
      if (result == "" || !result) {
        res.render("multiple", {
          display: "block",
          Errordis: "Data is not found!!😢Please enter correct name and Roll no.",
          table: display
        });
      } else {
        display = "";
        result.forEach(element => {
          display += "<tr><td>" + element.Roll_no + "</td><td>" + element.Name + "</td><td>" + element.Class + "</td></tr>";
        });
        res.render("multiple", {
          display: "none",
          table: display
        });
      }
    });

  }



}

//get full data
exports.getdata=(req,res)=>{
    data.find((err,result)=>{
        if(err)
        console.log(err);
        display = "";
        result.forEach(element => {
          display += "<tr><td>" + element.Roll_no + "</td><td>" + element.Name + "</td><td>" + element.Class + "</td></tr>";
        });
        res.render("table", {
          display: "none",
          table: display
        });
    })
}