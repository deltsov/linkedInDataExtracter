import { browser } from "webextension-polyfill-ts";

import GoogleSheetBridge from '@src/services/googleSheetBridge'

import { BRIDGE_CHOICE_STORAGE, SHEET } from '@src/options'

export async function isBridgeConfigured() {return true}
