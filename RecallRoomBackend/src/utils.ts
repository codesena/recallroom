export const random = (len: number) => {
  let randomString =
    "mynameisnikhilvermafromiitguwahtimechanicalengineeringstuentbatch2021";
  const length = randomString.length;
  let result = "";
  for (let i = 0; i < len; i++)
    result += randomString[Math.floor(Math.random() * length)];
  return result;
};
