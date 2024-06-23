/** @format */

import mongoose from "mongoose"

let isConnected = false // Track the connection status

export const connectToDB = async () => {
	mongoose.set("strictQuery", true)

	if (isConnected) {
		console.log("MongoDB is already connected.")
		return
	}

	if (!process.env.MONGODB_URI) {
		console.error("MONGODB_URI is not defined in environment variables.")
		throw new Error("MONGODB_URI is not defined.")
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "share_prompt",
		})

		isConnected = true
		console.log("MongoDB connected successfully.")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
		throw error // Re-throw the error to handle it in the calling function
	}
}
