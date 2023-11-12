export function handlerLengthLine(ctx: any, text: string) {
  const maxWidth = 130;
  const dividedStr: string[] = [];
  let newStr = text;
  if (text) {
    let start = 0;
    let end = 0;
    for (let i = 0; i <= newStr.length; i++) {
      let b = ctx.measureText(newStr.slice(start, i)).width;
      if (b > maxWidth) {
        dividedStr.push(newStr.slice(start, i));

        start = i;
        end = i;
      }
    }
    let str = newStr.slice(end, newStr.length);
    dividedStr.push(str);
    newStr = str;
  }

  return dividedStr;
}
