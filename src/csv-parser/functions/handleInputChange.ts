import loadContent from './loadContent';
import toJson from './toJson';

interface IHandleInputChangeParams {
  inputElement: HTMLInputElement;
  separator?: string;
}

type HandleInputChangeResponse = Promise<
  | {
      filename: string;
      content: object[];
    }
  | undefined
>;

async function handleInputChange({
  inputElement,
  separator = ',',
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
    return Promise.resolve(undefined);
  }

  const serializedCSV = toJson({ csvContent, separator });

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
