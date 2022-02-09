import React, { useState, useEffect, FunctionComponent } from "react";
import { browser } from "webextension-polyfill-ts";

import { Title } from '@src/components/title'
// import { BridgeSelect } from '@src/components/bridgeSelect'
import { GoogleSheetConf } from '@src/components/sheet_options'

import { SHEET, BRIDGE_CHOICE_STORAGE } from '@src/options'

import "./styles.scss";


// export const Popup: FunctionComponent = () => {
//     const [bridge, setBridge] = useState('');

//     useEffect(() => {
//         browser.storage.local.get([
//             BRIDGE_CHOICE_STORAGE
//         ]).then(function(result) {
//             if(result[BRIDGE_CHOICE_STORAGE]){
//                 setBridge(result[BRIDGE_CHOICE_STORAGE])
//             } else {
//                 setBridge(SHEET)
//             }
//         });

//     }, [])

//     function handleSelect(bridgeValue: string){
//         setBridge(bridgeValue);
//         browser.storage.local.set({
//             [BRIDGE_CHOICE_STORAGE]: bridgeValue
//         })
//     }

//     let optionsComponent: React.ReactNode;
//     if (bridge === SHEET){
//         optionsComponent = <GoogleSheetConf />
//     } else {
//         optionsComponent = (
//             <div>.</div>
//         )
//     }

//     return (
//         <div className="popup-container">
//             <div className="container mt-3 ">
//                 <Title />
//                 <BridgeSelect
//                     onSelect={handleSelect}
//                     value={bridge}
//                 />

//                 <div className="mx-2 my-3">
//                     {optionsComponent}
//                 </div>
//             </div>
//         </div>
//     );
// };
