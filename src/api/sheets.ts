import { google } from "googleapis";
// import credentials from "../credentials.json";

export async function appendToSheet(values: string[]) {
  const auth = new google.auth.GoogleAuth({
    // credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "YOUR_SHEET_ID";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [values],
    },
  });
}