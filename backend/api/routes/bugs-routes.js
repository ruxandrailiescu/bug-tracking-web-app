const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
  } = require('../services/bugs-service');
  
  module.exports = function () {
    const operations = {
      GET,
      POST,
      PUT,
      DELETE,
    };
  
    async function GET(req, res, next) {
      try {
        const bugs = await getAllBugs();
        res.status(200).json(bugs);
      } catch (error) {
        next(error);
      }
    }
  
    async function POST(req, res, next) {
      try {
        const newBug = await createBug(req.body);
        res.status(201).json(newBug);
      } catch (error) {
        next(error);
      }
    }
  
    async function PUT(req, res, next) {
      try {
        const { id } = req.query;
        if (!id) return res.status(400).send('ID query parameter is required.');
  
        const updatedBug = await updateBug(id, req.body);
        if (!updatedBug) return res.status(404).send('Bug not found.');
  
        res.status(200).json(updatedBug);
      } catch (error) {
        next(error);
      }
    }
  
    async function DELETE(req, res, next) {
      try {
        const { id } = req.query;
        if (!id) return res.status(400).send('ID query parameter is required.');
  
        const rowsDeleted = await deleteBug(id);
        if (rowsDeleted === 0) return res.status(404).send('Bug not found.');
  
        res.status(200).send('Bug deleted successfully.');
      } catch (error) {
        next(error);
      }
    }
  
    GET.apiDoc = {
      summary: "Get all bugs",
      operationId: "getBugs",
      responses: {
        200: {
          description: "List of bugs",
          schema: {
            type: "array",
            items: { $ref: "#/definitions/Bug" },
          },
        },
      },
    };
  
    POST.apiDoc = {
      summary: "Create a bug",
      operationId: "createBug",
      consumes: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "bug",
          schema: { $ref: "#/definitions/Bug" },
        },
      ],
      responses: {
        201: { description: "Bug created" },
      },
    };
  
    PUT.apiDoc = {
      summary: "Update a bug",
      operationId: "updateBug",
      parameters: [
        {
          in: "query",
          name: "id",
          required: true,
          type: "integer",
        },
        {
          in: "body",
          name: "bug",
          schema: { $ref: "#/definitions/Bug" },
        },
      ],
      responses: {
        200: { description: "Bug updated" },
      },
    };
  
    DELETE.apiDoc = {
      summary: "Delete a bug",
      operationId: "deleteBug",
      parameters: [
        {
          in: "query",
          name: "id",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        200: { description: "Bug deleted" },
      },
    };
  
    return operations;
  };  