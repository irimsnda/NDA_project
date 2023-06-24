/**
 * Created by Kip on 11/6/2018.
 */
Ext.define('Admin.store.workflowmanagement.TransitionsStr', {
    extend: 'Ext.data.Store',
    storeId: 'transitionsstr',
    alias: 'store.transitionsstr',
    requires: [
        'Admin.model.workflowmanagement.WorkflowManagementMdl'
    ],
    model: 'Admin.model.workflowmanagement.WorkflowManagementMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'workflow/getApplicationTransitioning',
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
