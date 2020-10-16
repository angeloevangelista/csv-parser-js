const CSV = {
  loadCsv: async (csvFile) => {
    return new Promise((resolve, reject) => {
      try {
        let csvContent = '';
        const reader = new FileReader();

        reader.onload = () => {
          csvContent = reader.result;

          resolve(csvContent);
        };

        reader.readAsBinaryString(csvFile);
      } catch (error) {
        reject(error);
      }
    });
  },

  toJson: (csvContent) => {
    const lines = csvContent.split('\n');
    let header = lines[0]
      .split(',')
      .map((column) => column.trim().replaceAll('"', ''));

    lines.shift();

    const values = lines.map((line) => line.split(','));

    let collection = [];

    for (let i = 0; i < lines.length; i++) {
      let item = {};

      for (let j = 0; j < header.length; j++) {
        Object.assign(item, {
          [header[j]]: values[i][j],
        });
      }

      collection.push(item);
    }

    return collection;
  },
};

async function handleSelectFile() {
  const csvFile = csvInput.files[0];

  if (csvFile.length === 0) {
    return;
  }

  const csvContent = await CSV.loadCsv(csvFile);

  const serializedCSV = CSV.toJson(csvContent);

  console.log(serializedCSV);
}

let csvInput = null;

document.onreadystatechange = () => {
  csvInput = document.getElementById('csv-input');

  csvInput.addEventListener('change', handleSelectFile);
};
