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
  let lines = csvContent.split('\n');

  let header = lines[0]
    .split(separator)
    .map((column) => column.trim().replace(/"/g, ''));

  lines.shift();

  lines = lines.filter((line) => line.replace(/,/g, '').trim());

  let collection: Array<{
    [key: string]: string;
  }> = [];

  lines.forEach((line) => {
    const lineValues = line.split(separator);

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
