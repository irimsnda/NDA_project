Ext.define('Admin.model.parameters.CostMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'cost_center_id', type: 'string'},
        {name: 'cost_center', type: 'string'},
        {name: 'cost_category_id', type: 'string'},
        {name: 'cost_category', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});