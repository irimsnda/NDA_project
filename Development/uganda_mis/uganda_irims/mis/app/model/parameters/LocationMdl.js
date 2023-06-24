/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.LocationMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'country_id', type: 'int'},
        {name: 'country_name', type: 'string'},
        {name: 'region_id', type: 'int'},
        {name: 'region_name', type: 'string'},
        {name: 'district_id', type: 'int'},
        {name: 'district_name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});