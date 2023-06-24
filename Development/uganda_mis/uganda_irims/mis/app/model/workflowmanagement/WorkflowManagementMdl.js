/**
 * Created by Kip on 9/12/2018.
 */
Ext.define('Admin.model.workflowmanagement.WorkflowManagementMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});