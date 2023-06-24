/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.model.organisationconfig.OrganisationConfigMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});