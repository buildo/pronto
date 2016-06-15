# brew install awscli
# aws configure (insert keys, set region to eu-central-1)

# modify API_ENDPOINT in config.js to 'http://oxway-prod.elasticbeanstalk.com'

npm run clean &&
NODE_ENV=production npm run build-customer &&
NODE_ENV=production npm run build-restaurant &&

# deploy "customer" app
aws s3 sync --acl public-read --content-encoding gzip --exclude '*' --include '*.gz' build/customer s3://pronto-customer
aws s3 sync --acl public-read --exclude '*.gz' build/customer s3://pronto-customer

# deploy "restaurant" app
aws s3 sync --acl public-read --content-encoding gzip --exclude '*' --include '*.gz' build/restaurant s3://pronto-restaurant
aws s3 sync --acl public-read --exclude '*.gz' build/restaurant s3://pronto-restaurant