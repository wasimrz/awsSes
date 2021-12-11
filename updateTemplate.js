const { AWS } = require("../awsConfig");

function updateTemplate({ TemplateName, HtmlPart, SubjectPart, TextPart }) {
  //updateTemplateparams
  var params = {
    Template: {
      TemplateName,
      HtmlPart,
      SubjectPart,
      TextPart,
    },
  };

  //CreatethepromiseandSESserviceobject
  var templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .updateTemplate(params)
    .promise();
  return templatePromise;
}
module.exports = {
  updateTemplate,
};

// const param = {
//   TemplateName: "onboarding",
//   SubjectPart: "Welcome",
//   TextPart:
//     "Your purchase of “{{courseName}}“ is complete. Let’s get started by creating your kid’s profile. Please follow the link to create profile {{onboardUrl}}",
