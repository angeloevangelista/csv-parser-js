import * as HandleInputChange from './functions/handleInputChange';
import * as LoadContent from './functions/loadContent';
import * as ToJson from './functions/toJson';
import * as ValidateFields from './functions/validateFields';

interface ICSV {
  loadContent: (
    params: LoadContent.ILoadContentParams,
  ) => LoadContent.LoadContentResponse;

  toJson: (params: ToJson.IToJsonParams) => ToJson.IToJsonResponse;

  handleInputChange: (
    params: HandleInputChange.IHandleInputChangeParams,
  ) => HandleInputChange.HandleInputChangeResponse;

  validateFields: (
    params: ValidateFields.IValidateFieldsParams,
  ) => ValidateFields.IValidateFieldsResponse;
}

const CSV: ICSV = {
  handleInputChange: HandleInputChange.default,
  loadContent: LoadContent.default,
  toJson: ToJson.default,
  validateFields: ValidateFields.default,
};

declare global {
  interface Window {
    CSV: ICSV;
  }
}

window.CSV = CSV;

export { ICSV, CSV };
export default CSV;
