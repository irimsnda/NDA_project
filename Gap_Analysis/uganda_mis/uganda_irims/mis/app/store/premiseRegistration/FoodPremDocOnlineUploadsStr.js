/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.store.premiseRegistration.FoodPremDocOnlineUploadsStr', {
    extend: 'Ext.data.Store',
    storeId: 'foodpremdoconlineuploadsstr',
    alias: 'store.foodpremdoconlineuploadsstr',
    requires: [
        'Admin.model.premiseRegistration.PremiseRegMdl'
    ],
    model: 'Admin.model.premiseRegistration.PremiseRegMdl',
    autoLoad: false,
    groupField: 'trader_id',
    proxy: {
        type: 'ajax',
        url: 'premiseregistration/getOnlineApplicationUploads',
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
