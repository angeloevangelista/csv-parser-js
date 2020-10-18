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
    return Promise.reject('Element not found');
  }

  if (!inputElement.files || inputElement.files.length === 0) {
    return Promise.reject('No file selected.');
  }

  const { name } = inputElement.files[0];

  const csvFile = inputElement.files[0];
  const csvContent = await loadContent({ csvFile });

  if (!csvContent) {
    return Promise.reject('File with no content.');
  }

  const serializedCSV = toJson({ csvContent });

  return {
    filename: name,
    content: serializedCSV,
  };
}

export default handleSelectFile;
export { IHandleSelectFileParams, HandleSelectFileResponse, handleSelectFile };
