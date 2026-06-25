export function splitText(text: string, wordsCount: number = 12): string {
  if (!text) return "";

  const response = text
    .split("\n")
    .map((line) => {
      const words = line.split(" ").filter(Boolean);
      let lineResult = "";

      for (let i = 0; i < words.length; i++) {
        lineResult += words[i];
        if (i < words.length - 1) {
          if ((i + 1) % wordsCount === 0) {
            lineResult += "\n";
          } else {
            lineResult += " ";
          }
        }
      }

      return lineResult;
    })
    .join("\n");
  return response;
}
