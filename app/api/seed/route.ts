import { NextResponse } from "next/server";
import { ref, set } from "firebase/database";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import importData from "@/import_database.json";

export async function GET() {
  const email = "admin@onkur.net";
  const password = "onkuradmin123";

  try {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (createError: any) {
      if (createError.code !== "auth/email-already-in-use") {
        throw createError;
      }
    }

    await signInWithEmailAndPassword(auth, email, password);

    // Restore full original database structure from import_database.json
    for (const [key, value] of Object.entries(importData)) {
      await set(ref(db, key), value);
    }

    return NextResponse.json({ success: true, message: "Original database restored successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
