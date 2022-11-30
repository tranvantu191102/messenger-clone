export const formatFileSize = (size: number) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${
    ["B", "KB", "MB", "GB", "TB"][i]
  }`;
};

export const formatFileName = (fileName: string) => {
  const splited: string[] = fileName.split(".");
  const newName: string =
    splited[0].length > 14 ? splited[0].slice(0, 14) : splited[0];

  return `${newName}.${splited[1]}`;
};
