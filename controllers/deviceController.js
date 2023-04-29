import { WriteData, ReadData } from "../utils/RWDeviceFile.js";

const getAllDeviceData = async (req, res, next) => {
  try {
    //read data from file
    const data = await ReadData();

    if (!data) {
      res.status(404).send("Device data file is not found");
      throw new Error("Device data file is not found");
    }

    res.status(200).json({ devices: data });
  } catch (error) {
    next(error);
  }
};

const createDevice = async (req, res, next) => {
  try {
    const { deviceId, deviceName, deviceStatus } = req.body;

    //declare array
    let resultArr = [];

    // check null values
    if (!deviceId || !deviceName || deviceStatus === "") {
      res.status(400).send("Please provide all values");
      throw new Error("Please provide all values");
    }

    //read data from file
    const readData = await ReadData();

    // create data object
    const data = {
      deviceId: deviceId,
      deviceName: deviceName,
      deviceStatus: deviceStatus,
      timestamp: Date.now(),
    };

    //check whether data file available or not
    if (!readData) {
      //if unavailable data file
      resultArr.push(data);
      WriteData(resultArr);
      res.status(200).json(data);
    } else {
      //if data file is available
      for (let i = 0; i < readData.length; i++) {
        resultArr.push({
          deviceId: readData[i].deviceId,
          deviceName: readData[i].deviceName,
          deviceStatus: readData[i].deviceStatus,
          timestamp: readData[i].timestamp,
        });
      }

      resultArr.push(data);

      WriteData(resultArr);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Read data from file
    const data = await ReadData();

    if (!data) {
      res.status(400).send("Data File Is Empty");
      throw new Error("Data File Is Empty");
    }

    // Find the index of the element with matching id
    const index = data.findIndex((item) => item.deviceId === id);

    if (index === -1) {
      res.status(404).send(`Device with id ${id} not found`);
      throw new Error(`Device with id ${id} not found`);
    }

    // Update the value at the found index
    data[index] = { ...data[index], ...req.body };

    // Save updated data back to file
    WriteData(data);
    res.status(200).json({ device: data[index] });
  } catch (error) {
    next(error);
  }
};

const deleteDevice = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Read data from file
    const data = await ReadData();

    if (!data) {
      res.status(400).send("Data File Is Empty");
      throw new Error("Data File Is Empty");
    }

    // Find the index of the element with matching id
    const index = data.findIndex((item) => item.deviceId === id);

    if (index === -1) {
      res.status(404).send(`Device with id ${id} not found`);
      throw new Error(`Device with id ${id} not found`);
    }

    // Remove the element at the found index
    data.splice(index, 1);

    console.log(data.splice(index, 1));

    // Save updated data back to file
    WriteData(data);
    res.status(200).json("Device delete successful");
  } catch (error) {
    next(error);
  }
};

export { createDevice, getAllDeviceData, updateDevice, deleteDevice };
