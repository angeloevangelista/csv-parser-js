import * as HandleInputChange from './handleInputChange';
import * as LoadContent from './loadContent';
import * as ToJson from './toJson';

interface ICSV {
  loadContent: (
    params: LoadContent.ILoadContentParams,
  ) => LoadContent.LoadContentResponse;
  toJson: (params: ToJson.IToJsonParams) => ToJson.ToJsonResponse;
  handleSelectFile: (
    params: HandleInputChange.IHandleSelectFileParams,
  ) => HandleInputChange.HandleSelectFileResponse;
}

const CSV: ICSV = {
  handleSelectFile: HandleInputChange.default,
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
