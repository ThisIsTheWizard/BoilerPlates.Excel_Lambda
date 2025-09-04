# BoilerPlates.Excel_Lambda

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?logo=awslambda)](https://aws.amazon.com/lambda/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-blue?logo=amazons3)](https://aws.amazon.com/s3/)
[![SQS](https://img.shields.io/badge/AWS-SQS-FF9900?logo=amazonaws)](https://aws.amazon.com/sqs/)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-purple?logo=axios)](https://axios-http.com/)
[![ExcelJS](https://img.shields.io/badge/ExcelJS-Spreadsheet-success?logo=microsoft-excel)](https://github.com/exceljs/exceljs)

AWS Lambda function that processes SQS messages containing API details, fetches paginated JSON data, converts it to Excel format, and stores the file in S3.

---

## 📖 Overview

This project is an **AWS Lambda function** that:

1. Listens to **SQS messages**
2. Fetches paginated JSON data using **Axios** until the limit is reached.
3. Merges all rows into a dataset.
4. Generates an **Excel file** with **ExcelJS**.
5. Stores the Excel file in an **S3 bucket**.

---

## ⚙️ Architecture

```

SQS → Lambda → Axios (API Calls) → ExcelJS → S3

```

---

## 🛠 Tech Stack

- **Runtime**: Node.js 22.x
- **AWS Services**: Lambda, S3, SQS
- **Libraries**:
  - [Axios](https://axios-http.com/) – API requests with pagination
  - [ExcelJS](https://github.com/exceljs/exceljs) – Excel file creation

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/ThisIsTheWizard/BoilerPlates.Excel_Lambda.git

cd BoilerPlates.Excel_Lambda
```

Install dependencies:

```bash
npm install
```

Run the service using using AWS SAM CLI:

```bash
npm run dev
```

---

## 📩 Example SQS Message

```json
{
  "api_token": "My secret api token",
  "api_url": "https://example.com/json",
  "total_limit": 5000
}
```

---

## 📝 License

This boilerplate is provided under the MIT License.
Feel free to use and modify it for your projects.

---

👋 Created by [Elias Shekh](https://sheikhthewizard.world).
If you find this useful, ⭐ the repo or reach out!
