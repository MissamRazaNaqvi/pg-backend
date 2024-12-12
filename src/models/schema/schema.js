const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "tenant", "admin"],
      default: "tenant",
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// PG (Paying Guest) Schema
const PGSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    description: String,
    amenities: [String],
    rules: [String],
    totalRooms: Number,
    availableRooms: Number,
    rentPerBed: Number,
    gender: {
      type: String,
      enum: ["male", "female", "mixed"],
    },
    images: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Room Schema
const RoomSchema = new mongoose.Schema(
  {
    pgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    capacity: Number,
    occupiedBeds: Number,
    rentPerBed: Number,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Booking Schema
const BookingSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "active", "completed"],
      default: "pending",
    },
    startDate: Date,
    endDate: Date,
    totalRent: Number,
  },
  { timestamps: true }
);

// Rent Payment Schema
const RentPaymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Export Models
module.exports = {
  User: mongoose.model("User", UserSchema),
  PG: mongoose.model("PG", PGSchema),
  Room: mongoose.model("Room", RoomSchema),
  Booking: mongoose.model("Booking", BookingSchema),
  RentPayment: mongoose.model("RentPayment", RentPaymentSchema),
};
