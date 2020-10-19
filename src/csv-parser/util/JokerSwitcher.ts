/**
 * 'Joker' is used to express that the variable contains the JOKER term inside it
 */

type TJokerSwitcher = (
  entryValues: string[],
) => {
  useJoker: ({
    delimiterChar,
  }: IUseJokerOptions) => {
    jokerValues: string[];
    removeJoker: TRemoveJoker;
  };
  removeJoker: TRemoveJoker;
};

type TRemoveJoker = ({ replacementContent }: IRemoveJokerParams) => string[];

interface IPartialValuesMap {
  originalArrayBeginIndex: number;
  originalArrayEndIndex: number;
}

interface IUseJokerOptions {
  delimiterChar?: string;
}

interface IRemoveJokerParams {
  replacementContent: string;
}

interface IJokerValue {
  orderOfOccurrence: number;
  value: string;
}

const JokerSwitcher: TJokerSwitcher = (entryValues: string[]) => {
  const JokerString = '_JOKER_STRING_';

  return {
    useJoker: ({ delimiterChar = '"' }) => {
      const partialValuesMaps: IPartialValuesMap[] = [];

      entryValues.forEach((possiblePartialValue, possiblePartialValueIndex) => {
        if (possiblePartialValue.startsWith(delimiterChar)) {
          partialValuesMaps.push({
            originalArrayBeginIndex: possiblePartialValueIndex,
            originalArrayEndIndex: possiblePartialValueIndex,
          });
        }

        if (possiblePartialValue.endsWith(delimiterChar)) {
          partialValuesMaps[
            partialValuesMaps.length - 1
          ].originalArrayEndIndex = possiblePartialValueIndex;
        }
      });

      const jokerValues: IJokerValue[] = [];

      partialValuesMaps.forEach((partialValuesMap, indexOfMap) => {
        const jokerValue = entryValues
          .slice(
            partialValuesMap.originalArrayBeginIndex,
            partialValuesMap.originalArrayEndIndex + 1,
          )
          .join(JokerString)
          .replace(/"/g, '');

        jokerValues.push({
          orderOfOccurrence: indexOfMap,
          value: jokerValue,
        });
      });

      // now we will fix the values collection
      const jokerLine: string[] = [];
      let countOfSwitchedValues = 0;

      for (
        let entryValuesIndex = 0;
        entryValuesIndex < entryValues.length;
        entryValuesIndex++
      ) {
        const isBeginningOfBrokenValue = partialValuesMaps.find(
          (partialValuesMap) =>
            partialValuesMap.originalArrayBeginIndex === entryValuesIndex,
        );

        if (isBeginningOfBrokenValue) {
          const foundJokerValue = jokerValues.find(
            (jokerValue) =>
              jokerValue.orderOfOccurrence === countOfSwitchedValues,
          );

          if (foundJokerValue) {
            jokerLine.push(foundJokerValue.value);
          }

          entryValuesIndex +=
            isBeginningOfBrokenValue.originalArrayEndIndex -
            isBeginningOfBrokenValue.originalArrayBeginIndex;

          countOfSwitchedValues++;
        } else {
          jokerLine.push(entryValues[entryValuesIndex]);
        }
      }

      return {
        jokerValues: jokerLine,
        removeJoker: JokerSwitcher(jokerLine).removeJoker,
      };
    },

    removeJoker: ({ replacementContent }) => {
      const jokerRegex = new RegExp(JokerString, 'g');

      const fixedValues = entryValues.map((value) =>
        value.replace(jokerRegex, replacementContent),
      );

      return fixedValues;
    },
  };
};

export default JokerSwitcher;
