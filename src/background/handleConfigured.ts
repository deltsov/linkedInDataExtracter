import { browser } from "webextension-polyfill-ts";

import GoogleSheetBridge from '@src/services/googleSheetBridge'

import { BRIDGE_CHOICE_STORAGE, SHEET } from '@src/options'

export async function isBridgeConfigured() {return true}
// export async function isBridgeConfigured() {
//     const result = await browser.storage.local.get([
//         BRIDGE_CHOICE_STORAGE
//     ]);

//     const bridge = result[BRIDGE_CHOICE_STORAGE];

//     if(bridge === SHEET) {
//         return await GoogleSheetBridge.isConfigured()
//     }else if(bridge === DATABLIST){
//         return false;
//     }else{
//         // Default to Airtable
//         return await AirtableBridge.isConfigured()
//     }
// }
