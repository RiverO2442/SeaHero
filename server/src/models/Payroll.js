import mongoose from "mongoose";

const payrollEntrySchema = new mongoose.Schema({
  employeeId:  { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  name:        { type: String, required: true },
  department:  { type: String, required: true },
  role:        { type: String, required: true },
  daysWorked:  { type: Number, required: true },
  dailyRate:   { type: Number, required: true },
  overtime:    { type: Number, default: 0 },
  grossPay:    { type: Number, required: true },
  taxRate:     { type: Number, required: true },
  deductions:  { type: Number, default: 0 },
  netPay:      { type: Number, required: true },
  status:      { type: String, enum: ["Pending", "Approved", "On Hold", "Released"], default: "Pending" },
});

const payrollSchema = new mongoose.Schema(
  {
    period:  { type: String, required: true },
    entries: [payrollEntrySchema],
  },
  { timestamps: true }
);

payrollSchema.index({ period: 1 }, { unique: true });

export default mongoose.model("Payroll", payrollSchema);
