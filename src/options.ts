export const BRIDGE_CHOICE_STORAGE = "BridgeSelectStorage";


export const SHEET = "sheet";

export const PROFILE_FIELDS = [
    "LinkedInUrl",
    "Image",
    "Title",
    "Company",
    "Name"
]

export const GOOGLE_SHEET_SPREADSHEET_ID_STORAGE = "GSheetSpreadSheetId";
export const GSheetFieldMappingStorage = (field: string): string => {
    return `SheetField-${field}`
}
