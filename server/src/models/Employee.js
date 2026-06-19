import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true },
    department: { type: String, required: true },
    role:       { type: String, required: true },
    dailyRate:  { type: Number, required: true, min: 0 },
    status:     { type: String, enum: ["Active", "Inactive"], default: "Active" },
    avatarUrl:  { type: String },
    initials:   { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
