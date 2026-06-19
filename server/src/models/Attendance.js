import mongoose from "mongoose";

const attendanceEntrySchema = new mongoose.Schema({
  employeeId:  { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  name:        { type: String, required: true },
  department:  { type: String, required: true },
  status:      { type: String, enum: ["Present", "Half-day", "Absent", "On Leave"], required: true },
  hoursWorked: { type: Number, default: 0, min: 0, max: 24 },
  dailyRate:   { type: Number, required: true },
});

const attendanceSchema = new mongoose.Schema(
  {
    date:      { type: String, required: true },
    committed: { type: Boolean, default: false },
    entries:   [attendanceEntrySchema],
  },
  { timestamps: true }
);

attendanceSchema.index({ date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
