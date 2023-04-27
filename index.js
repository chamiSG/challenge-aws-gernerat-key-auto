const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 8000
app.use(cors())

const { CreateAccessKeyCommand, IAMClient } = require("@aws-sdk/client-iam");

const ADMIN_CREDENTIAL_ID = "your-admin-credential-id"
const ADMIN_CREDENTIAL_KEY = "your-admin-credential-key"
const USERNAME = "your-username"

const client = new IAMClient({
  region: 'us-west-2',
  credentials: {
    accessKeyId: ADMIN_CREDENTIAL_ID,
    secretAccessKey: ADMIN_CREDENTIAL_KEY
  }
});

/**
 * @param {string} userName
 * @returns Promise<CreateAccessKeyCommandOutput>
 */
const createAccessKey = (userName) => {
  const command = new CreateAccessKeyCommand({ UserName: userName });
  return client.send(command);
};

// Creating Access Key for user.
createAccessKey(USERNAME)
  .then((res) => {
    console.log("AccessKeyId: ", res.AccessKey.AccessKeyId);
    console.log("SecretAccessKey: ", res.AccessKey.SecretAccessKey);
  })
  .catch((err) => {
    console.error("Failed to create access key: ", JSON.stringify(err, null, 2));
  });



app.get("/healthChecker", (req, res) => {
  res.json({ message: "Welcome to server!" })
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});