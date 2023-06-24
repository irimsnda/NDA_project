/**
 * Created by Kip on 9/11/2018.
 */
Ext.define('Admin.view.workflowmanagement.viewmodels.WorkflowManagementVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.workflowmanagementvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'WorkflowManagementVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false
    }

});