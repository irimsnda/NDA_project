Ext.define('Admin.store.parameters.OutputsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.outputsstr',
    storeId: 'outputsstr',
    fields: [
        'name'
    ],

    data: { items: [
            { name: 'None'},
            { name: 'Receipt'},
            { name: 'Debit Note'},
            { name: 'Credit Note'}
        ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
