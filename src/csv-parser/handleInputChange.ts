import loadContent from './loadContent';
import toJson from './toJson';

interface IHandleSelectFileParams {
  inputElement: HTMLInputElement | null;
}

interface IHandleSelectFileResponse {
  filename: string;
  content: object[];
}

type HandleSelectFileResponse = Promise<IHandleSelectFileResponse | undefined>;

async function handleSelectFile({
  inputElement,
}: IHandleSelectFileParams): HandleSelectFileResponse {
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
  const csvContent = await loadContent({ csvFile });
  const serializedCSV = toJson({ csvContent });

  return {
    filename: name,
    content: serializedCSV,
  };
}

export default handleSelectFile;
export { IHandleSelectFileParams, HandleSelectFileResponse, handleSelectFile };
