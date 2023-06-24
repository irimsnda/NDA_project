/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.store.surveillance.SurveillanceGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'surveillancegridabstractstore',
    alias: 'store.surveillancegridabstractstore',
    requires: [
        'Admin.model.surveillance.SurveillanceMdl'
    ],
    model: 'Admin.model.surveillance.SurveillanceMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'surveillance/getSurveillanceParamFromModel',
        headers: {
            'Authorization': 'Bearer ' + access_token
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
