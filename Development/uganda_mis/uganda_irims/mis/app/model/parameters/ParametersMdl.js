/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.ParametersMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});