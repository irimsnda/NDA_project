/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.store.premiseRegistration.PremisesInspectionDashGridStr', {
    extend: 'Ext.data.Store',
    storeId: 'premisesinspectiondashgridstr',
    alias: 'store.premisesinspectiondashgridstr',
    requires: [
        'Admin.model.premiseRegistration.PremiseRegMdl'
    ],
    model: 'Admin.model.premiseRegistration.PremiseRegMdl',
    autoLoad: false,
    grouper: {
        groupFn: function (item) {
            return item.get('process_id') + item.get('workflow_stage_id') + item.get('inspection_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'premiseregistration/getPremisesInspectionDetails',
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
