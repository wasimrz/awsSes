const { AWS } = require("../awsConfig");
const defaultAddress = require("../config.json");

function sendEmail({
  ccAddresses,
  toAddresses,
  bccAddress,
  htmlData,
  textData = "",
  subject = "",
  source = defaultAddress.source,
}) {
  // Create sendEmail params
  var params = {
    Destination: {
      /* required */
      CcAddresses: Array.isArray(ccAddresses) ? ccAddresses : [ccAddresses],
      ToAddresses: Array.isArray(toAddresses) ? toAddresses : [toAddresses],
      BccAddresses: Array.isArray(bccAddress) ? bccAddress : [bccAddress],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: htmlData,
        },
        Text: {
          Charset: "UTF-8",
          Data: textData,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: `Dailydoc <${source}>` /* required */,
    ReplyToAddresses: [defaultAddress.replyTo],
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();
  return sendPromise;
  // Handle promise's fulfilled/rejected states
  // sendPromise
  //   .then(function (data) {
  //     console.log(data.MessageId);
  //   })
  //   .catch(function (err) {
  //     console.error(err, err.stack);
  //   });
}

module.exports = { sendEmail };

// sendEmail({
//   toAddresses: "bk@dailydoc.io",
//   source: "support@dailydoc.io",
//   subject: "Welcome",
//   htmlData: "<h1>Wel come to <strong>Dailydoc </strong> </h1>",
//   textData: " we are pleased to have have you on board on this journey",
// })
//   .then((res) => console.log("response from send email", res))
//   .catch((err) => console.log("error while sending email", err));
