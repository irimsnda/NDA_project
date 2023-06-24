Ext.define('Admin.store.parameters.costs.CostCategoriesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.costcategoriesstr',
    storeId: 'costcategoriesstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getcostCategories',
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
