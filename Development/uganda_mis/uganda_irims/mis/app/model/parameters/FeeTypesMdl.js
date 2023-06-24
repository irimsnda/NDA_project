/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.FeeTypesMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'gl_code', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});