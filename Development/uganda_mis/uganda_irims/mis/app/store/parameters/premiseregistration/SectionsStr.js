Ext.define('Admin.store.parameters.premiseregistration.SectionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.sectionsstr',
    storeId: 'sectionsstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'configurations/getConfigParamFromTable?table_name=par_sections',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
