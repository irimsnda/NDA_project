/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.model.configurations.ConfigurationsMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {
            name: 'name_format', type: 'string',
            convert: function (val, row) {
                return row.data.name + '(' + row.data.ref_format+')';
            }
        }
    ]
});