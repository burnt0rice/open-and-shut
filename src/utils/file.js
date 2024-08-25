import {
  BaseDirectory,
  exists,
  createDir,
  writeTextFile,
  readTextFile,
} from "@tauri-apps/api/fs";

const dataDir = "data";
const mainFile = "main.json";
const mainFileTemplate = {
  sessions: [],
};

const initFile = async () => {
  //Check and create $APPDATA/data directory
  const dataDirExists = await exists(dataDir, {
    dir: BaseDirectory.AppData,
  });

  if (!dataDirExists) {
    await createDir(dataDir, {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }

  //Check and create main.json file
  const mainExists = await exists(`${dataDir}/${mainFile}`, {
    dir: BaseDirectory.AppData,
  });

  if (!mainExists) {
    await writeTextFile(
      `${dataDir}/${mainFile}`,
      JSON.stringify(mainFileTemplate),
      {
        dir: BaseDirectory.AppData,
      },
    );
  }
};

const loadFile = async () => {
  const mainExists = await exists(`${dataDir}/${mainFile}`, {
    dir: BaseDirectory.AppData,
  });

  //If main.json does not exist, create it
  if (!mainExists) {
    initFile();
  }

  const mainData = await readTextFile(`${dataDir}/${mainFile}`, {
    dir: BaseDirectory.AppData,
  });

  return JSON.parse(mainData);
};

const saveFile = async (data) => {
  await writeTextFile(`${dataDir}/${mainFile}`, JSON.stringify(data), {
    dir: BaseDirectory.AppData,
  });
};

const saveSessions = async (sessions) => {
  const mainData = await loadFile();
  mainData.sessions = sessions;

  await saveFile(mainData);
};

const resetFile = async () => {
  //Reset main.json file with template
  await writeTextFile(
    `${dataDir}/${mainFile}`,
    JSON.stringify(mainFileTemplate),
    {
      dir: BaseDirectory.AppData,
    },
  );
};

export { initFile, loadFile, saveFile, saveSessions, resetFile };
