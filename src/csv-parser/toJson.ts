interface IToJsonParams {
  csvContent: string;
}

type ToJsonResponse = Array<{
  [key: string]: string;
}>;

function toJson({ csvContent }: IToJsonParams): ToJsonResponse {
  let lines = csvContent.split('\n');

  let header = lines[0]
    .split(',')
    .map((column) => column.trim().replace(/"/g, ''));

  lines.shift();

  lines = lines.filter((line) => line.replace(/,/g, '').trim());

  let collection: Array<{
    [key: string]: string;
  }> = [];

  lines.forEach((line) => {
    const lineValues = line.split(',');

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
