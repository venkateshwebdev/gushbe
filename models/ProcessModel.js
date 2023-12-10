const { default: mongoose } = require("mongoose");

const processSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    steps: [
      {
        id: {
          type: Number,
          required: [true, "Please provide a id"],
        },
        title: {
          type: String,
          required: [true, "Please provide a name for this step"],
        },
        description: {
          type: String,
          required: [true, "Please provide a description for this step"],
        },
      },
    ],
    createdByAI: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const ProcessSchema = mongoose.model("Process", processSchema);

module.exports = ProcessSchema;
