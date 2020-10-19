import JokerSwitcher from '../util/JokerSwitcher';

interface IToJsonParams {
  csvContent: string;
  separator?: string;
}

type ToJsonResponse = Array<{
  [key: string]: string | number;
}>;

function toJson({
  csvContent,
  separator = ',',
}: IToJsonParams): ToJsonResponse {
  const separatorRegex = new RegExp(separator, 'g');

  let lines = csvContent.split('\n');

  const header = JokerSwitcher(
    lines[0].split(separator).map((column) => column.trim()),
  )
    .useJoker({ delimiterChar: '"' })
    .removeJoker({ replacementContent: ',' });

  lines.shift();

  // this removes all lines in blank
  lines = lines.filter((line) => line.replace(separatorRegex, '').trim());

  let collection: Array<{
    [key: string]: string;
  }> = [];

  lines.forEach((line) => {
    let lineValues = line.split(separator);

    const hasComma = header.length < lineValues.length;

    if (hasComma) {
      lineValues = JokerSwitcher(lineValues)
        .useJoker({ delimiterChar: '"' })
        .removeJoker({ replacementContent: ',' });
    }

    let serializedLine = {};

    header.forEach((headerColumn, headerColumnIndex) => {
      const rawValue = lineValues[headerColumnIndex];
      let typedValue;

      if (!rawValue) {
        typedValue = null;
      } else {
        typedValue = isNaN(Number(rawValue))
          ? String(rawValue)
          : Number(rawValue);
      }

      serializedLine = {
        ...serializedLine,
        [headerColumn]: typedValue,
      };
    });

    collection.push(serializedLine);
  });

  return collection;
}

export { IToJsonParams, ToJsonResponse, toJson };
export default toJson;
