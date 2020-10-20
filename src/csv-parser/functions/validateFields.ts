interface IValidateFieldsParams {
  expectedColumns: string[];
  data: Array<{
    [key: string]: string | number;
  }>;
}

interface IValidateFieldsResponse {
  isValid: boolean;
  error: Error | null;
  data: Array<{
    [key: string]: string | number;
  }>;
}

function validateFields({
  data,
  expectedColumns,
}: IValidateFieldsParams): IValidateFieldsResponse {
  try {
    const countOfRegistries = data.length;

    if (countOfRegistries < 1) {
      throw new Error('No data found.');
    }

    const enteredDataProps = Object.keys(data[0]);

    const collectionItemsHaveInconsistentProperties = data.find((item) => {
      enteredDataProps !== Object.keys(item);
    });

    if (collectionItemsHaveInconsistentProperties) {
      throw new Error('Data has inconsistent properties.');
    }

    const dataPropertiesAreValid = data.every((dataItem) =>
      Object.keys(dataItem).every(
        (dataItemProp, dataItemPropIndex) =>
          expectedColumns[dataItemPropIndex] === dataItemProp,
      ),
    );

    if (!dataPropertiesAreValid) {
      throw new Error('Data properties are different from expected.');
    }
  } catch (error) {
    return {
      data,
      error,
      isValid: false,
    };
  }

  return {
    data,
    error: null,
    isValid: true,
  };
}

export { IValidateFieldsParams, IValidateFieldsResponse, validateFields };
export default validateFields;
