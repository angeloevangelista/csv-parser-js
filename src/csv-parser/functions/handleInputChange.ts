import loadContent from './loadContent';
import toJson from './toJson';

interface IHandleInputChangeParams {
  inputElement: HTMLInputElement | null;
}

interface IHandleInputChangeResponse {
  filename: string;
  content: object[];
}

type HandleInputChangeResponse = Promise<
  IHandleInputChangeResponse | undefined
>;

async function handleInputChange({
  inputElement,
}: IHandleInputChangeParams): HandleInputChangeResponse {
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

export default handleInputChange;
export {
  IHandleInputChangeParams,
  HandleInputChangeResponse,
  handleInputChange,
};
