import { log } from "console";
import fs from "fs";
import path from "path";

const WriteData = (data) => {
  fs.writeFile("UserDataFile.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
};

const ReadData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./UserDataFile.json", "utf8", (err, data) => {
      if (err) {
        resolve(false);
        reject(err);
      } else {
        if (data.length > 0) {
          let obj = JSON.parse(data);
          resolve(obj);
        }
      }
    });
  });
};

export { WriteData, ReadData };
