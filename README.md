<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./.github/images/csv-parser-logo.png" alt="CSV Parser Js" width="80">
  </a>

  <h3 align="center">CSV Parser Js</h3>

  <p align="center">
    A lib to serialize CSV files into JSON objects.
  </p>
</p>

# Usage

Import the files, that you can find on `build/`, in your page, then you will be able to invoke `CSV`. It contains three methods you can use to handle your CSV files on browser

## **handleInputChange**

It's basically what you need to add on change event of your input element and it will return you the serialized file, it's not necessary to check if the input have files, but if you do not do it, the promise will be reject, so just treat the exception.

**Parameters**

```javascript
const params = {
  inputElement: 'HTMLInputElement',
  separator: 'string'; // default = ','
}
```

**Return type**

🕒 Promise

If the file is in blank, You will receive `undefined`, but if the file has a valid content you will receive an object in the following format:

```javascript
const response = {
  filename: 'string',
  content: 'object[]', // the properties will follow the header found in this CSV file
};
```

## **loadContent**

This function and the other one 'toJson' are just exported in case you wish to validate by yourself the content or anything else before serialize.

**Parameters**

```javascript
const params = {
  csvFile: 'Blob | File',
};
```

**Return type**

🕒 Promise

This function returns the raw content as a string.

## **toJson**

This function and the other one 'toJson' are just exported in case you wish to validate by yourself the content or anything else before serialize.

**Parameters**

**csvContent**: The raw content of a CSV file.

```javascript
const params = {
  csvContent: 'string',
  separator: 'string', // default = ','
};
```

**Return type**

This function returns an object with the serialized CSV as the following:

```typescript
Array<{
  [key: string]: string | number;
}>

/* e.g:

Correct:
  [
    { id: 0, name: "Jhon Doe" },
    { id: 1, name: "Jhon Roe" }
  ]

X Incorrect:
  [
    { 9001 : "value" }
  ]
*/
```
