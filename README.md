# JMBG-JS

Javascript class used to extract data from ex Yugoslavian unique master citizen numbers.

## Introduction

**JMBG** (jedinstveni matični broj građana) or *unique master citizen numbers* is a 13 characters long number assigned to all newborns in ex Yugoslavian countries. It seems random but it isn't. It holds following data:

* date of birth
* state of birth
* place of birth (region/city)
* gender
* validation checksum

This JavaScript class can be used to extract this data from **JMBG** numbers.

## Installation

```html
<script src="https://gornostay25.github.io/JMBG-JS/js/JMBG.js"></script>
```

## Usage

```javascript
let jmbg = new JMBG("0101006500006")

jmbg.isValid() // return is JMBG valid (true/false)
jmbg.parse({
    ignoreValidation: false,
    getGender: true,
    getYO:true, // Get age
    getUTime: true, //Get UNIX time
    getRegion: true, // get region
    lang: 1 //lang 
})
```

See a [example.html](https://github.com/gornostay25/JMBG-JS/blob/main/example.html) file

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)