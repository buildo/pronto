# pronto printer
A nodejs server that listens to restaurant orders on firebase and prints them

## Install
- decrypt the `pronto-a743dda5179f.json` file (using buildo's credentials pass)
  - `openssl cast5-cbc -d -in $1.cast5 -pass file:/path/to/.buildo-credentials-pass -out $1`
- copy this directory to the Raspberry
- `npm install`
- `node index <restaurantId>`
