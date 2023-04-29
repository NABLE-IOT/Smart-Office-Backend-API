import { WriteData, ReadData } from "../utils/RWUserFile.js";
import { generateOtp, mailTransport } from "../utils/Mail.js";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res, next) => {
  try {
    const { userName, email } = req.body;

    //declare array
    let resultArr = [];

    //generate OTP
    const OTP = generateOtp();

    //generate user id
    const id = uuidv4();
    // create data object
    const data = {
      id: id,
      userName: userName,
      email: email,
      password: OTP,
    };

    //check null values
    if (!userName || !email) {
      res.status(400).send("Please provide all values");
      throw new Error("Please provide all values");
    }
    // Read data from file
    const readData = await ReadData();

    //check whether data file available or not
    if (!readData) {
      //if unavailable data file
      resultArr.push(data);

      await mailTransport(email, OTP, userName);
    } else {
      //if data file is available

      //check email already exist
      const userAlreadyExists = readData.find((item) => item.email === email);

      if (userAlreadyExists) {
        res.status(400).send("Email is already exists");
        throw new Error("Email is already exists");
      }

      for (let i = 0; i < readData.length; i++) {
        resultArr.push({
          id: readData[i].id,
          userName: readData[i].userName,
          email: readData[i].email,
          password: readData[i].password,
        });
      }

      resultArr.push(data);

      await mailTransport(email, OTP, userName);
    }

    WriteData(resultArr);
    res.status(201).json({ user: data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check null values
    if (!email || !password) {
      res.status(400).send("Please provide all values");
      throw new Error("Please provide all values");
    }

    // Read data from file
    const readData = await ReadData();

    //check data file available
    if (!readData) {
      res.status(400).send("Data File Unavailable");
      throw new Error("Data File Unavailable");
    }

    //check user available or not
    const user = readData.find((item) => item.email === email);

    if (!user) {
      res.status(401).send("Invalid Credentials");
      throw new Error("Invalid Credentials");
    }

    //check password correct
    if (user.password !== password) {
      res.status(401).send("Invalid Password");
      throw new Error("Invalid Password");
    }

    user.password = undefined;
    res.status(200).json({ user: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Read data from file
    const data = await ReadData();

    if (!data) {
      res.status(400).send("Data File Is Empty");
      throw new Error("Data File Is Empty");
    }

    // Find the index of the element with matching id
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send(`User with id ${id} not found`);
      throw new Error(`User with id ${id} not found`);
    }

    // Update the value at the found index
    data[index] = { ...data[index], ...req.body };

    // Save updated data back to file
    WriteData(data);
    res.status(200).json({ user: data });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Read data from file
    const data = await ReadData();

    if (!data) {
      res.status(400).send("Data File Is Empty");
      throw new Error("Data File Is Empty");
    }

    // Find the index of the element with matching id
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send(`User with id ${id} not found`);
      throw new Error(`User with id ${id} not found`);
    }

    // Remove the element at the found index
    data.splice(index, 1);

    console.log(data.splice(index, 1));

    // Save updated data back to file
    WriteData(data);
    res.status(200).json("User delete successful");
  } catch (error) {
    next(error);
  }
};

export { register, login, updateUser, deleteUser };
