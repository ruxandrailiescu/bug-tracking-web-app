// const apiDoc = {
//   swagger: "2.0",
//   basePath: "/",
//   info: {
//     title: "Bug Tracking App API",
//     version: "1.0.0",
//   },
//   definitions: {
//     Bug: {
//       type: "object",
//       properties: {
//         id: { type: "integer" },
//         type: { type: "string" },
//         description: { type: "string" },
//         status: { type: "string", enum: ["Open", "In Progress", "Resolved"] },
//         priority: { type: "string", enum: ["Low", "Medium", "High"] },
//         severity: { type: "string", enum: ["Minor", "Major", "Critical"] },
//         assigned_to: { type: "integer" },
//         commit_id: { type: "integer" },
//       },
//       required: ["id", "type", "description", "priority", "severity"],
//     },
//     Project: {
//       type: "object",
//       properties: {
//         id: { type: "integer", readOnly: true },
//         name: { type: "string" },
//         description: { type: "string" },
//         status: { type: "string", enum: ["Active", "Inactive"] },
//         repository_url: { type: "string" },
//         created_at: { type: "string", format: "date-time" },
//         updated_at: { type: "string", format: "date-time" },
//       },
//       required: ["id", "name", "status"],
//     },
//     User: {
//       type: "object",
//       properties: {
//         user_id: { type: "integer", readOnly: true },
//         username: { type: "string" },
//         email: { type: "string" },
//         password: { type: "string" },
//       },
//       required: ["username", "email", "password"],
//     },
//   },
//   paths: {
//     "/projects": {
//       get: {
//         operationId: "getAllProjects",
//         summary: "Get all projects",
//         responses: {
//           200: {
//             description: "List of projects",
//             schema: {
//               type: "array",
//               items: { $ref: "#/definitions/Project" },
//             },
//           },
//         },
//       },
//       post: {
//         operationId: "createProject",
//         summary: "Create a new project",
//         parameters: [
//           {
//             name: "project",
//             in: "body",
//             required: true,
//             schema: { $ref: "#/definitions/Project" },
//           },
//         ],
//         responses: {
//           201: {
//             description: "Project created successfully",
//             schema: { $ref: "#/definitions/Project" },
//           },
//           400: {
//             description: "Bad request",
//           },
//         },
//       },
//     },
//     "/projects/{id}": {
//       get: {
//         operationId: "getProjectById",
//         summary: "Get project by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the project to retrieve",
//           },
//         ],
//         responses: {
//           200: {
//             description: "Project by id",
//             schema: { $ref: "#/definitions/Project" },
//           },
//           404: {
//             description: "Project not found",
//           },
//         },
//       },
//       put: {
//         operationId: "updateProject",
//         summary: "Update project by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the project to update",
//           },
//           {
//             name: "project",
//             in: "body",
//             required: true,
//             schema: { $ref: "#/definitions/Project" },
//           },
//         ],
//         responses: {
//           200: {
//             description: "Project updated successfully",
//             schema: { $ref: "#/definitions/Project" },
//           },
//           404: {
//             description: "Project not found",
//           },
//           400: {
//             description: "Bad request",
//           },
//         },
//       },
//       delete: {
//         operationId: "deleteProject",
//         summary: "Delete project by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the project to delete",
//           },
//         ],
//         responses: {
//           200: {
//             description: "Project deleted successfully",
//           },
//           404: {
//             description: "Project not found",
//           },
//         },
//       },
//     },
//     "/users": {
//       get: {
//         operationId: "getAllUsers",
//         summary: "Get all users",
//         responses: {
//           200: {
//             description: "List of users",
//             schema: {
//               type: "array",
//               items: { $ref: "#/definitions/User" },
//             },
//           },
//         },
//       },
//       post: {
//         operationId: "createUser",
//         summary: "Create a new user",
//         parameters: [
//           {
//             name: "user",
//             in: "body",
//             required: true,
//             schema: { $ref: "#/definitions/User" },
//           },
//         ],
//         responses: {
//           201: {
//             description: "User created successfully",
//             schema: { $ref: "#/definitions/User" },
//           },
//           400: {
//             description: "Bad request",
//           },
//         },
//       },
//     },
//     "/users/{id}": {
//       get: {
//         operationId: "getUserById",
//         summary: "Get user by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the user to retrieve",
//           },
//         ],
//         responses: {
//           200: {
//             description: "User by id",
//             schema: { $ref: "#/definitions/User" },
//           },
//           404: {
//             description: "User not found",
//           },
//         },
//       },
//       put: {
//         operationId: "updateUser",
//         summary: "Update user by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the user to update",
//           },
//           {
//             name: "user",
//             in: "body",
//             required: true,
//             schema: { $ref: "#/definitions/User" },
//           },
//         ],
//         responses: {
//           200: {
//             description: "User updated successfully",
//             schema: { $ref: "#/definitions/User" },
//           },
//           404: {
//             description: "User not found",
//           },
//           400: {
//             description: "Bad request",
//           },
//         },
//       },
//       delete: {
//         operationId: "deleteUser",
//         summary: "Delete user by Id",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "integer",
//             description: "ID of the user to delete",
//           },
//         ],
//         responses: {
//           200: {
//             description: "User deleted successfully",
//           },
//           404: {
//             description: "User not found",
//           },
//         },
//       },
//     },
//   },
// };

// module.exports = apiDoc;
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
    Project: {
      type: "object",
      properties: {
        id: { type: "integer", readOnly: true },
        name: { type: "string" },
        description: { type: "string" },
        status: { type: "string", enum: ["Active", "Inactive"] },
        repository_url: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
      required: ["id", "name", "status"],
    },
    User: {
      type: "object",
      properties: {
        user_id: { type: "integer", readOnly: true },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "email", "password"],
    },
    UserProject: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        project_id: { type: "integer" },
        role: { type: "string", enum: ["MP", "TST"] },
      },
      required: ["user_id", "project_id", "role"],
    },
  },
  paths: {
    "/projects": {
      get: {
        operationId: "getAllProjects",
        summary: "Get all projects",
        responses: {
          200: {
            description: "List of projects",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/Project" },
            },
          },
        },
      },
      post: {
        operationId: "createProject",
        summary: "Create a new project",
        parameters: [
          {
            name: "project",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/Project" },
          },
        ],
        responses: {
          201: {
            description: "Project created successfully",
            schema: { $ref: "#/definitions/Project" },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/projects/{id}": {
      get: {
        operationId: "getProjectById",
        summary: "Get project by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the project to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Project by id",
            schema: { $ref: "#/definitions/Project" },
          },
          404: {
            description: "Project not found",
          },
        },
      },
      put: {
        operationId: "updateProject",
        summary: "Update project by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the project to update",
          },
          {
            name: "project",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/Project" },
          },
        ],
        responses: {
          200: {
            description: "Project updated successfully",
            schema: { $ref: "#/definitions/Project" },
          },
          404: {
            description: "Project not found",
          },
          400: {
            description: "Bad request",
          },
        },
      },
      delete: {
        operationId: "deleteProject",
        summary: "Delete project by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the project to delete",
          },
        ],
        responses: {
          200: {
            description: "Project deleted successfully",
          },
          404: {
            description: "Project not found",
          },
        },
      },
    },
    "/users": {
      get: {
        operationId: "getAllUsers",
        summary: "Get all users",
        responses: {
          200: {
            description: "List of users",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/User" },
            },
          },
        },
      },
      post: {
        operationId: "createUser",
        summary: "Create a new user",
        parameters: [
          {
            name: "user",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/User" },
          },
        ],
        responses: {
          201: {
            description: "User created successfully",
            schema: { $ref: "#/definitions/User" },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        operationId: "getUserById",
        summary: "Get user by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the user to retrieve",
          },
        ],
        responses: {
          200: {
            description: "User by id",
            schema: { $ref: "#/definitions/User" },
          },
          404: {
            description: "User not found",
          },
        },
      },
      put: {
        operationId: "updateUser",
        summary: "Update user by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the user to update",
          },
          {
            name: "user",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/User" },
          },
        ],
        responses: {
          200: {
            description: "User updated successfully",
            schema: { $ref: "#/definitions/User" },
          },
          404: {
            description: "User not found",
          },
          400: {
            description: "Bad request",
          },
        },
      },
      delete: {
        operationId: "deleteUser",
        summary: "Delete user by Id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the user to delete",
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          404: {
            description: "User not found",
          },
        },
      },
    },
    "/user-projects": {
      get: {
        operationId: "getAllUserProjects",
        summary: "Get all user-project associations",
        responses: {
          200: {
            description: "List of user-project associations",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/UserProject" },
            },
          },
        },
      },
      post: {
        operationId: "createUserProject",
        summary: "Create a new user-project association",
        parameters: [
          {
            name: "userProject",
            in: "body",
            required: true,
            schema: { $ref: "#/definitions/UserProject" },
          },
        ],
        responses: {
          201: {
            description: "User-project association created successfully",
            schema: { $ref: "#/definitions/UserProject" },
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/user-projects/{userId}": {
      get: {
        operationId: "getUserProjectsByUserId",
        summary: "Get user-project associations by user ID",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the user to retrieve associations for",
          },
        ],
        responses: {
          200: {
            description: "User-project associations for user",
            schema: { type: "array", items: { $ref: "#/definitions/UserProject" } },
          },
          404: {
            description: "User not found",
          },
        },
      },
      delete: {
        operationId: "deleteUserProjectByUserId",
        summary: "Delete user-project association by user ID",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the user to delete the association for",
          },
          {
            name: "projectId",
            in: "path",
            required: true,
            type: "integer",
            description: "ID of the project to delete the association for",
          },
        ],
        responses: {
          200: {
            description: "User-project association deleted successfully",
          },
          404: {
            description: "User-project association not found",
          },
        },
      },
    },
  },
};

module.exports = apiDoc;
