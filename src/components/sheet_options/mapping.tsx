import React, { useState, useEffect, FunctionComponent } from "react";

import { PROFILE_FIELDS } from '@src/options'
import GoogleSheetBridge from '@src/services/googleSheetBridge'

import {FieldsMapping} from './fields'

interface IMappingProps {
    spreadsheetId: string
}

export const Mapping: FunctionComponent<IMappingProps> = ({
    spreadsheetId
}) => {
    const [fields, setFields] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const columns = await GoogleSheetBridge.fetchColumns(spreadsheetId)
                setErrorMessage("")
                setFields(columns)
            } catch(err) {
                setErrorMessage('Couldnt fetch spreadsheet')
            }
        })()
    }, [spreadsheetId])

    return (
        <div className="mt-3">
            <div className="mb-3">
                <strong>Mapping Google Sheet Fields</strong>

                {}

            </div>

        </div>
    )
}
