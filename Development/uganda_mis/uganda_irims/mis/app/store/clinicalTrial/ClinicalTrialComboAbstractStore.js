/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.store.clinicalTrial.ClinicalTrialComboAbstractStore', {
        extend: 'Ext.data.Store',
        storeId: 'clinicaltrialcomboabstractstore',
        alias: 'store.clinicaltrialcomboabstractstore',
        requires: [
            'Admin.model.clinicalTrial.ClinicalTrialMdl'
        ],
        model: 'Admin.model.clinicalTrial.ClinicalTrialMdl',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: 'clinicaltrial/getClinicalTrialParamFromModel',
            headers: {
                'Authorization':'Bearer '+access_token
            },
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'results',
                messageProperty: 'msg'
            }
        },
        listeners: {
            load: function (store, records, success, operation) {
                var reader = store.getProxy().getReader(),
                    response = operation.getResponse(),
                    successID = reader.getResponseData(response).success,
                    message = reader.getResponseData(response).message;
                if (!success || (successID == false || successID === false)) {
                    toastr.warning(message, 'Warning Response');
                }
            }
        }
    });
