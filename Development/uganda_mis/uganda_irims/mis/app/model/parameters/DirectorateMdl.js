/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.DirectorateMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'telephone',type: 'string'},
        {name: 'physical_address',type: 'string'},
        {name: 'postal_address',type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});