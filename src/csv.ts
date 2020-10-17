declare global {
  interface Window {
    CSV: ICSV;
  }
}

interface IHandleResponse {
  filename: string;
  content: object[];
}

interface ICSV {
  loadContent(csvFile: Blob | File): Promise<string>;
  toJson(csvContent: string): object[];
  handleSelectFile(
    inputElement: HTMLInputElement | null,
  ): Promise<IHandleResponse | undefined>;
}

const CSV: ICSV = {
  async loadContent(csvFile) {
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
  },

  toJson(csvContent) {
    const lines = csvContent.split('\n');

    let header = lines[0]
      .split(',')
      .map((column) => column.trim().replace(/"/g, ''));

    lines.shift();

    let collection: Array<{
      [key: string]: string;
    }> = [];

    lines.forEach((line) => {
      const lineValues = line.split(',');

      let serializedLine = {};

      header.forEach((headerColumn, headerColumnIndex) => {
        serializedLine = {
          ...serializedLine,
          [headerColumn]: lineValues[headerColumnIndex],
        };
      });

      collection.push(serializedLine);
    });

    return collection;
  },

  async handleSelectFile(inputElement) {
    if (!inputElement) {
      console.error('Element not found.');
      return;
    }

    if (!inputElement.files || inputElement.files.length === 0) {
      console.warn('No files selected.');
      return;
    }

    const { name } = inputElement.files[0];

    const csvFile = inputElement.files[0];
    const csvContent = await this.loadContent(csvFile);
    const serializedCSV = this.toJson(csvContent);

    return {
      filename: name,
      content: serializedCSV,
    };
  },
};

window.CSV = CSV;

export default CSV;
