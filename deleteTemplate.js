const { AWS } = require("../awsConfig");

function deleteTemplate(templateName) {
  // Create the promise and SES service object
  var templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .deleteTemplate({ TemplateName: templateName })
    .promise();

  return templatePromise;
  // // Handle promise's fulfilled/rejected states
  // templatePromise
  //   .then(function (data) {
  //     console.log("Template Deleted");
  //   })
  //   .catch(function (err) {
  //     console.error(err, err.stack);
  //   });
}
module.exports = {
  deleteTemplate,
};
