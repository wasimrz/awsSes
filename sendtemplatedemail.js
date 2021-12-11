const { AWS } = require("../awsConfig");
const defaultConfig = require("../config.json");

const sendTemplatedEmail = ({
  toAddresses,
  ccAddresses,
  bccAddress,
  templateName,
  templateData,
  source = defaultConfig.source,
  ConfigurationSetName = defaultConfig.ConfigurationSetName,
}) => {
  // Create sendTemplatedEmail params
  var params = {
    Destination: {
      /* required */
      CcAddresses: Array.isArray(ccAddresses) ? ccAddresses : [ccAddresses],
      ToAddresses: Array.isArray(toAddresses) ? toAddresses : [toAddresses],
      BccAddresses: Array.isArray(bccAddress) ? bccAddress : [bccAddress],
    },
    Source: `Dailydoc <${source}>` /* required */,
    Template: templateName /* required */,
    TemplateData: JSON.stringify(templateData) /* required */,
    ReplyToAddresses: [defaultConfig.replyTo],
    ConfigurationSetName: ConfigurationSetName,
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendTemplatedEmail(params)
    .promise();

  return sendPromise;
};

module.exports = {
  sendTemplatedEmail,
};

// sendTemplatedEmail({
//   toAddresses: "bk@dailydoc.io",
//   templateName: "email-otp",
//   templateData: {
//     name: "bala",
//     otp: 12345,
//   },
// })
//   .then((res) => console.log("test run", res))
//   .catch((err) => console.log("error", err));
