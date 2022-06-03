>## Typescript

In: _**e2e/config.json**_

edit: 

    {
      ...
      "testRegex": "\\.e2e\\.js$",
    }

to: 

    {
      ...
      "testRegex": "\\.e2e\\.ts$",
    }


importation :

    import { expect } from 'detox'