/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.store.gmpApplications.GmpAppGridAbstractStore', {
        extend: 'Ext.data.Store',
        storeId: 'gmpappgridabstractstore',
        alias: 'store.gmpappgridabstractstore',
        requires:[
            'Admin.model.premiseRegistration.PremiseRegMdl'
        ],
        model: 'Admin.model.premiseRegistration.PremiseRegMdl',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: 'gmpapplications/getPremiseRegParamFromModel',
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
