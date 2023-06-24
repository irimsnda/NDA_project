Ext.define('Admin.store.parameters.T_TypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.t_typesstr',
    storeId: 't_typesstr',
    fields: [
        'name'
    ],

    data: { items: [
            { name: 'Debit'},
            { name: 'Credit'}
        ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
