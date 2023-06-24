Ext.define('Admin.store.parameters.premiseregistration.BusinessCategoriesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.businesscategoriesstr',
    storeId: 'businesscategoriesstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'premiseregistration/parameters/businesscategory',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    }
});
