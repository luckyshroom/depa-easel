const i18nConfig = {
  "en-US": {
    "Type the link and press enter": "Type the link and press enter",
    "Invalid Link": "Invalid Link",
    "Can't show plugin, component {{type}} not found.":
      "Can't show plugin, component {{type}} not found.",
    "Block List": "Block List"
  },
  "ru-RU": {
    "Type the link and press enter": "Введите адресс ссылки и нажмите Ввод",
    "Invalid Link": "Ссылка не действительна",
    "Block List": "Список блоков"
  }
};

export const replaceData = (str, data) => {
  const rgx = /{{\s?(\w+)\s?}}/gm;
  let msg = str;
  msg = msg.replace(rgx, (_, key) => data[key]);
  return msg;
};

export default i18nConfig;
