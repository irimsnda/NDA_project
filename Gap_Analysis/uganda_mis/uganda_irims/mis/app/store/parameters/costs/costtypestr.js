Ext.define('Admin.store.parameters.costs.CostTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.costtypesstr',
    storeId: 'costtypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
    listeners: {
        beforeload: function (store, records, success, operation) {
            store.getProxy().extraParams={
                table_name: 'par_cost_types'
            }
        }
    }
});
