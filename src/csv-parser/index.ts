import * as HandleInputChange from './functions/handleInputChange';
import * as LoadContent from './functions/loadContent';
import * as ToJson from './functions/toJson';

interface ICSV {
  loadContent: (
    params: LoadContent.ILoadContentParams,
  ) => LoadContent.LoadContentResponse;

  toJson: (params: ToJson.IToJsonParams) => ToJson.ToJsonResponse;

  handleInputChange: (
    params: HandleInputChange.IHandleInputChangeParams,
  ) => HandleInputChange.HandleInputChangeResponse;
}

const CSV: ICSV = {
  handleInputChange: HandleInputChange.default,
  loadContent: LoadContent.default,
  toJson: ToJson.default,
};

declare global {
  interface Window {
    CSV: ICSV;
  }
}

window.CSV = CSV;

export { ICSV, CSV };
export default CSV;
