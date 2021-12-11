const { AWS } = require("../awsConfig");

function createTemplate({ TemplateName, HtmlPart, SubjectPart, TextPart }) {
  //CreateTemplateparams
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
    .createTemplate(params)
    .promise();
  return templatePromise;
}
module.exports = {
  createTemplate,
};

// createTemplate(param)
//   .then((res) => console.log("response fro create function", res))
//   .catch((err) => console.log("error while creating template", err));
