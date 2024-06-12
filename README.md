# Receipt Processing App

The Receipt Processing App integrates with the Excelifier API to manage and analyze receipt data. With this app, you can:

1. Fetch all receipts from Excelifier.
2. Collect receipts to a file.
3. Retrieve a breakdown of all receipts during a specified time frame.

# Configuring Excelifier

The easiest way to get the receipts to Excelifier is by using email integration: [Excelifier Email Integration](https://dev.excelifier.com/docs/category/email-integration). You can also set up email forwarding for a better experience using this guide: [Email Automatic Forwarding](https://dev.excelifier.com/docs/email/automatic-forwarding).

## Configuration

Before you start, create a `.env` file in the root directory (you can copy from `.env.example`) and populate it with the following variables:

```plaintext
DIR_IN=./data_in
BEARER_TOKEN=your_bearer_token_from_excelifier
ORG_ID=your_organization_id
API_HOST=https://api.excelifier.com (optional, defaults to this URL if not set)
CREATED_FROM= (optional, defaults to the first day of the current month)
CREATED_TO= (optional, defaults to the last day of the current month)
```

Note: `CREATED_FROM` and `CREATED_TO` should be in ISO 8601 date format (`yyyy-MM-dd`).

## Running Locally with Node/Yarn

### Install packages:
```sh
yarn
```

### Start in dev mode:
```sh
yarn dev
```

### Build and start:
```sh
yarn build
yarn start
```

## Building Docker Image

```sh
docker build -t receipt-processing-app .
```

## Running Docker Container

```sh
docker run --name receipt-processing-app \
 -v ${PWD}/data_in:/app/data_in \
 -e DIR_IN=/app/data_in \
 -e BEARER_TOKEN=your_bearer_token_from_excelifier \
 -e ORG_ID=your_organization_id \
 -e API_HOST=https://api.excelifier.com \
 -e CREATED_FROM=2023-01-01 \
 -e CREATED_TO=2023-01-31 \
 receipt-processing-app
```

## Building and Running with Docker-Compose

First, modify `docker-compose.yml` with your Excelifier token, organization ID, and other necessary environment variables, then run:

```sh
docker-compose up -d
```
