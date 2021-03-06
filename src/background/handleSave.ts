import { browser, Tabs } from "webextension-polyfill-ts";

import { LinkedInProfile } from '@src/Profile'

import GoogleSheetBridge from '@src/services/googleSheetBridge'

import { BRIDGE_CHOICE_STORAGE, SHEET } from '@src/options'


export async function saveProfiles(
    tab: Tabs.Tab | undefined,
    profiles: LinkedInProfile[]
) {

    const result = await browser.storage.local.get([
        BRIDGE_CHOICE_STORAGE
    ])

    const bridge = result[BRIDGE_CHOICE_STORAGE];
    if(!bridge) {
        throw new Error("No bridge configured");
    };

    if(bridge === SHEET) {
        return await GoogleSheetBridge.createProfiles(profiles)
    };
    }


    // if (!tab) {
    //     return;
    // }
    // const { id: tabId } = tab
    // if (response) {
    //     browser.tabs.sendMessage(tabId, {
    //         action: "GOOD"
    //     })
    // }


// export async function saveProfiles(
//     tab: Tabs.Tab | undefined,
//     profiles: LinkedInProfile[]
// ) {

//     const result = await browser.storage.local.get([
//         BRIDGE_CHOICE_STORAGE
//     ])

//     const bridge = result[BRIDGE_CHOICE_STORAGE];
//     if(!bridge) {
//         throw new Error("No bridge configured");
//     };

//      if(bridge === SHEET) {
//         return await GoogleSheetBridge.createProfiles(profiles)
//     }


//     // if (!tab) {
//     //     return;
//     // }
//     // const { id: tabId } = tab
//     // if (response) {
//     //     browser.tabs.sendMessage(tabId, {
//     //         action: "GOOD"
//     //     })
//     // }
// }