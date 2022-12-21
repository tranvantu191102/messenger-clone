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

export const formatTime = (nanoseconds: number, seconds: number) => {
  const created = new Date(seconds * 1000 + nanoseconds / 1000000).getTime();
  // let periods = {
  //     y: 365 * 30 * 24 * 60 * 60 * 1000,
  //     m: 30 * 24 * 60 * 60 * 1000,
  //     w: 7 * 24 * 60 * 60 * 1000,
  //     d: 24 * 60 * 60 * 1000,
  //     h: 60 * 60 * 1000,
  //     s: 60 * 1000,
  // };
  let periods: number[] = [
    946080000000, 2592000000, 604800000, 86400000, 3600000, 60000,
  ];
  let diff = Date.now() - created;

  let arrTime = ["năm", "tháng", "tuần", "ngày", "giờ", "phút"];

  for (let i = 0; i < periods.length; i++) {
    if (diff > periods[i]) {
      let result = Math.floor(diff / periods[i]);
      return `${result} ${arrTime[i]}`;
    }
  }

  return "1 phút";
};
