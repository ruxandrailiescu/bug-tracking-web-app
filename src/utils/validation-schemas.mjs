export const createUserValidationSchema = {
  email: {
    isEmail: {
      errorMessage: "Invalid email format",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "Display name cannot be empty",
    },
    isString: {
      errorMessage: "Display name must be a string",
    },
  },
};

export const createProjectValidationSchema = {
  repositoryUrl: {
    isURL: {
      options: { protocols: ["http", "https"], require_protocol: true },
      errorMessage:
        "Repository URL must be a valid URL starting with http or https",
    },
    notEmpty: {
      errorMessage: "Repository URL cannot be empty",
    },
  },
};

export const createBugValidationSchema = {
  description: {
    notEmpty: {
      errorMessage: "Description is required",
    },
    isString: {
      errorMessage: "Description must be a string",
    },
  },
  severity: {
    notEmpty: {
      errorMessage: "Severity is required",
    },
    isIn: {
      options: [["Low", "Medium", "High"]],
      errorMessage: "Severity must be one of: Low, Medium, High",
    },
  },
  priority: {
    notEmpty: {
      errorMessage: "Priority is required",
    },
    isIn: {
      options: [["Low", "High", "Immediate"]],
      errorMessage: "Priority must be one of: Low, High, Immediate",
    },
  },
  status: {
    optional: true,
    isIn: {
      options: [["Open", "In progress", "Resolved"]],
      errorMessage: "Status must be one of: Open, In progress, Resolved",
    },
  },
  assignedTo: {
    optional: true,
    isMongoId: {
      errorMessage: "AssignedTo must be a valid ObjectId",
    },
  },
  commit: {
    isURL: {
      options: { protocols: ["http", "https"], require_protocol: true },
      errorMessage:
        "Commit URL must be a valid URL starting with http or https",
    },
    notEmpty: {
      errorMessage: "Commit URL cannot be empty",
    },
  },
};

export const updateBugStatusValidationSchema = {
  status: {
    notEmpty: {
      errorMessage: "Status is required",
    },
    isIn: {
      options: [["Open", "In progress", "Resolved"]],
      errorMessage: "Status must be one of: Open, In progress, Resolved",
    },
  },
};
