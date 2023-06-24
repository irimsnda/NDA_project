/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.ExchangeRatesMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'rate', type: 'number'},
        {name: 'currency_id', type: 'int'},
        {name: 'currency_name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});