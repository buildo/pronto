# pronto printer
A nodejs server that listens to restaurant orders on firebase and prints them

## How to run
- decrypt the `pronto-a743dda5179f.json` file (using buildo's credentials pass)
  - `openssl cast5-cbc -d -in $1.cast5 -pass file:/path/to/.buildo-credentials-pass -out $1`
- copy this directory to the Raspberry
  - `rsync -rav --exclude='node_modules' --exclude='*.cast5' . pi@<raspberry_ip>:/home/pi/pronto`
- connect via ssh to the raspberry
  - `ssh pi@<raspberry_ip>`
- `cd pronto`
- `npm install`
- `sudo node index <restaurantId>`
- 🎉
