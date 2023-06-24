/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.TransactionTypesMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 't_type', type: 'string'},
        {name: 'output', type: 'string'},
        {name: 'system_invoice', type: 'boolean'},
        {name: 'system_receipt', type: 'boolean'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});