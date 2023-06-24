/**
 * Created by Kip on 11/6/2018.
 */
Ext.define('Admin.store.workflowmanagement.ApplicationReturnOptionsStr', {
    extend: 'Ext.data.Store',
    storeId: 'applicationreturnoptionsstr',
    alias: 'store.applicationreturnoptionsstr',
    requires: [
        'Admin.model.workflowmanagement.WorkflowManagementMdl'
    ],
    model: 'Admin.model.workflowmanagement.WorkflowManagementMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'workflow/getApplicationReturnDirectives',
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
