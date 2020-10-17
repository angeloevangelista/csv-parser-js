interface ILoadContentParams {
  csvFile: Blob | File;
}

type LoadContentResponse = Promise<string>;

async function loadContent({
  csvFile,
}: ILoadContentParams): LoadContentResponse {
  return new Promise<string>((resolve, reject) => {
    try {
      const reader = new FileReader();

      let csvContent: string | ArrayBuffer | null = '';

      reader.onload = () => {
        csvContent = reader.result;

        resolve(csvContent?.toString());
      };

      reader.readAsBinaryString(csvFile);
    } catch (error) {
      reject(error);
    }
  });
}

export { ILoadContentParams, LoadContentResponse, loadContent };
export default loadContent;
