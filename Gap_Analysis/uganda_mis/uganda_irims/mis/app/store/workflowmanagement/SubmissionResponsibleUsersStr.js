/**
 * Created by Kip on 10/9/2018.
 */
Ext.define('Admin.store.workflowmanagement.SubmissionResponsibleUsersStr', {
    extend: 'Ext.data.Store',
    storeId: 'submissionresponsibleusersstr',
    alias: 'store.submissionresponsibleusersstr',
    requires: [
        'Admin.model.workflowmanagement.WorkflowManagementMdl'
    ],
    model: 'Admin.model.workflowmanagement.WorkflowManagementMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'workflow/getSubmissionResponsibleUsers',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
        extraParams: {}
    },
    listeners: {
        load: function (store, records, success, operation) {
            //var responsible_user = Ext.getCmp('responsibleUserCombo'),
            var responsible_user=Ext.ComponentQuery.query("#responsibleUserCombo")[0],
                reader = store.getProxy().getReader(),
                response = operation.getResponse(),
                successID = reader.getResponseData(response).success,
                message = reader.getResponseData(response).message,
                leadInspectorRecord = store.findRecord('role_id', 2);
            if (responsible_user) {
                if (leadInspectorRecord) {
                    responsible_user.setValue(leadInspectorRecord.get('id'));
                } else {
                    responsible_user.reset();
                }
            }
            if (!success || (successID == false || successID === false)) {
                toastr.warning(message, 'Warning Response');
            }
        }
    }
});
