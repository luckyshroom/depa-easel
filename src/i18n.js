const i18nConfig = {
  "en-US": {
    "Block list": "Block list",
    "Enter a URL": "Enter a URL",
    "Enter a Tweet ID": "Enter a Tweet ID",
    "Invalid link": "Invalid link",
    "Type the link and press enter": "Type the link and press enter",
  },
  "ru-RU": {
    "Block list": "Список блоков",
    "Enter a URL": "Введите URL",
    "Enter a Tweet ID": "Введите Tweet ID",
    "Invalid link": "Ссылка не действительна",
    "Type the link and press enter": "Введите адресс ссылки и нажмите ввод",
  }
};

export const replaceData = (str, data) => {
  const rgx = /{{\s?(\w+)\s?}}/gm;
  let msg = str;
  msg = msg.replace(rgx, (_, key) => data[key]);
  return msg;
};

export default i18nConfig;
