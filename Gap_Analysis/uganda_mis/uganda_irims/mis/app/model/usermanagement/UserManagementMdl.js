/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.model.usermanagement.UserManagementMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});