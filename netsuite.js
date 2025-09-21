/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/https', 'N/log', 'N/error', 'N/runtime'], function (record, https, log, error, runtime) {

    function beforeSubmit(context) {
        // Only process for CREATE and EDIT events on INVOICE records
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }

        var newRecord = context.newRecord;
        
        // Check if this is an invoice record
        if (newRecord.type !== record.Type.INVOICE) {
            log.debug({
                title: 'Record Type Not Invoice',
                details: 'Skipping script execution. Record type: ' + newRecord.type
            });
            return;
        }

        log.debug({
            title: 'Invoice Validation Event Triggered',
            details: 'Record Type: ' + newRecord.type + ', Event Type: ' + context.type
        });

        // Helper function for validation only
        function getFieldValue(fieldId) {
            try {
                return newRecord.getValue({ fieldId: fieldId });
            } catch (e) {
                return null;
            }
        }

        // Only validate critical fields that must exist
        var sfOpp = getFieldValue('custbody_pla_sf_opp');
        if (!sfOpp) {
            throw error.create({
                name: 'MISSING_SF_OPP',
                message: 'Missing required Salesforce Opportunity field (custbody_pla_sf_opp)',
                notifyOff: false
            });
        }

        // Perform API validation in beforeSubmit to prevent invoice creation on failure
        try {
            log.debug({
                title: 'Starting API Validation',
                details: 'Testing API connectivity before invoice creation'
            });

            // API Call 1: Create User (validation call)
            var userUrl = 'https://payments-sandbox.compassfurnishedapartments.com/api/v1/plaid/create-user';
            var userData = {
                custbody_pla_sf_opp: sfOpp
            };

            var headers = {
                'Content-Type': 'application/json'
            };

            var userResponse = https.post({
                url: userUrl,
                headers: headers,
                body: JSON.stringify(userData)
            });

            log.debug({
                title: 'User API Validation Response',
                details: 'Status Code: ' + userResponse.code + ', Body: ' + userResponse.body
            });

            // If user API fails, prevent invoice creation
            if (userResponse.code !== 200) {
                throw error.create({
                    name: 'USER_API_FAILED',
                    message: 'User API call failed with status code: ' + userResponse.code + '. Cannot create invoice. Response: ' + userResponse.body,
                    notifyOff: false
                });
            }

            // Parse and validate user response
            var userResponseData;
            try {
                userResponseData = JSON.parse(userResponse.body);
                if (!userResponseData.data || !userResponseData.data.userId) {
                    throw error.create({
                        name: 'INVALID_USER_RESPONSE',
                        message: 'Invalid user API response structure or missing userId. Cannot create invoice.',
                        notifyOff: false
                    });
                }
            } catch (parseError) {
                throw error.create({
                    name: 'USER_RESPONSE_PARSE_ERROR',
                    message: 'Error parsing user response: ' + parseError.toString() + '. Cannot create invoice.',
                    notifyOff: false
                });
            }

            log.debug({
                title: 'API Validation Passed',
                details: 'Invoice will be created, full API processing will happen in afterSubmit'
            });

        } catch (apiError) {
            // Log the error and prevent invoice creation
            log.error({
                title: 'API Validation Failed in beforeSubmit',
                details: 'Error: ' + apiError.toString()
            });
            
            // Re-throw the error to prevent invoice creation
            throw apiError;
        }
    }

    function afterSubmit(context) {
        // Only process for CREATE and EDIT events on INVOICE records
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }

        var newRecord = context.newRecord;
        
        // Check if this is an invoice record
        if (newRecord.type !== record.Type.INVOICE) {
            log.debug({
                title: 'Record Type Not Invoice',
                details: 'Skipping script execution. Record type: ' + newRecord.type
            });
            return;
        }

        var recordId = newRecord.id;

        log.debug({
            title: 'Invoice API Event Triggered',
            details: 'Record Type: ' + newRecord.type + ', Event Type: ' + context.type + ', Record ID: ' + recordId
        });

        // Load the record to get all final generated values
        var loadedRecord;
        try {
            loadedRecord = record.load({
                type: record.Type.INVOICE,
                id: recordId
            });
        } catch (loadError) {
            log.error({
                title: 'Failed to Load Invoice Record',
                details: 'Could not load invoice record ' + recordId + ': ' + loadError.toString()
            });
            return;
        }

        log.debug({
            title: 'Processing Invoice',
            details: 'Processing Invoice Transaction for API call with final generated values'
        });

        // Helper function to safely get field values from loaded record
        function getFieldValue(fieldId, isText) {
            try {
                return isText ? loadedRecord.getText({ fieldId: fieldId }) : loadedRecord.getValue({ fieldId: fieldId });
            } catch (e) {
                log.debug({
                    title: 'Field Not Available',
                    details: 'Field ' + fieldId + ' not found: ' + e.toString()
                });
                return null;
            }
        }

        var userId = null;

        try {
            // API Call 1: Create User (full call)
            var userUrl = 'https://payments-sandbox.compassfurnishedapartments.com/api/v1/plaid/create-user';
            var userData = {
                custbody_pla_sf_opp: getFieldValue('custbody_pla_sf_opp')
            };

            var headers = {
                'Content-Type': 'application/json'
            };

            // Double-check validation (should not fail as validated in beforeSubmit)
            if (!userData.custbody_pla_sf_opp) {
                log.error({
                    title: 'SF OPP Missing in afterSubmit',
                    details: 'This should not happen as validation was done in beforeSubmit'
                });
                return;
            }

            var userResponse = https.post({
                url: userUrl,
                headers: headers,
                body: JSON.stringify(userData)
            });

            log.debug({
                title: 'User API Response',
                details: 'Status Code: ' + userResponse.code + ', Body: ' + userResponse.body
            });

            // Check if user API call was successful
            if (userResponse.code !== 200) {
                log.error({
                    title: 'User API Failed in afterSubmit',
                    details: 'User API call failed with status code: ' + userResponse.code + '. Response: ' + userResponse.body
                });
                return;
            }

            // Parse the user response to get userId
            try {
                var userResponseData = JSON.parse(userResponse.body);
                if (userResponseData.data && userResponseData.data.userId) {
                    userId = userResponseData.data.userId;
                    log.debug({
                        title: 'User ID Retrieved',
                        details: 'User ID: ' + userId
                    });
                } else {
                    log.error({
                        title: 'Invalid User Response in afterSubmit',
                        details: 'Invalid user API response structure or missing userId'
                    });
                    return;
                }
            } catch (parseError) {
                log.error({
                    title: 'User Response Parse Error in afterSubmit',
                    details: 'Error parsing user response: ' + parseError.toString()
                });
                return;
            }

            // Add 5-second delay before extracting transaction data
            var startTime = new Date().getTime();
            var delayMs = 5000; // 5 seconds
            while (new Date().getTime() - startTime < delayMs) {
                // Busy wait to introduce delay
            }
            log.debug({
                title: 'Delay Completed',
                details: 'Waited for 5 seconds before extracting transaction data'
            });

            // Extract all relevant fields from the Invoice record with final generated values
            var transactionData = {
                id: recordId,
            };

            log.debug({
                title: 'Final Invoice Transaction Data',
                details: 'Invoice ID: ' + transactionData.id
            });

            // API Call 2: Create/Update Transaction
            var transactionUrl = 'https://payments-sandbox.compassfurnishedapartments.com/api/v1/invoice/netsuite/save';

            // Set headers for transaction API call - include userId
            var transactionHeaders = {
                'Content-Type': 'application/json',
                'userId': userId
            };

            log.debug({
                title: 'Making Transaction API Call',
                details: 'User ID: ' + userId
            });

            // Make the transaction API call
            var transactionResponse = https.post({
                url: transactionUrl,
                headers: transactionHeaders,
                body: JSON.stringify(transactionData)
            });

            log.debug({
                title: 'Transaction API Response',
                details: 'Status Code: ' + transactionResponse.code + ', Body: ' + transactionResponse.body
            });

            // Check if transaction API call was successful
            if (transactionResponse.code !== 200) {
                log.error({
                    title: 'Transaction API Failed',
                    details: 'Transaction API call failed with status code: ' + transactionResponse.code + '. Response: ' + transactionResponse.body
                });

                // Create and throw error when transaction API fails
                throw error.create({
                    name: 'TRANSACTION_API_FAILED',
                    message: 'Transaction API call failed with status code: ' + transactionResponse.code + '. Response: ' + transactionResponse.body,
                    notifyOff: false
                });
            }

            // Log successful completion
            log.audit({
                title: 'Invoice API Integration Successful',
                details: 'Both user and transaction APIs completed successfully for Invoice ID: ' + recordId
            });

        } catch (e) {
            // Log any errors during the API calls
            log.error({
                title: 'Invoice API Integration Failed in afterSubmit',
                details: 'Error: ' + e.toString()
            });
        }
    }

    return {
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});