const apiDoc = {
    swagger: "2.0",
    basePath: "/",
    info: {
      title: "Bug Tracking App API",
      version: "1.0.0",
    },
    definitions: {
      Bug: {
        type: "object",
        properties: {
          id: { type: "integer" },
          type: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["Open", "In Progress", "Resolved"] },
          priority: { type: "string", enum: ["Low", "Medium", "High"] },
          severity: { type: "string", enum: ["Minor", "Major", "Critical"] },
          assigned_to: { type: "integer" },
          commit_id: { type: "integer" },
        },
        required: ["id", "type", "description", "priority", "severity"],
      },
    },
    paths: {},
  };
  
  module.exports = apiDoc;  