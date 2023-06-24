/**
 * Created by Kip on 8/22/2018.
 */
Ext.define('Admin.model.parameters.PaymentIntervalsMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'duration', type: 'int'},
        {name: 'unit', type: 'int'},
        {name: 'fixed', type: 'boolean'},
        {name: 'fixed_entry_point', type: 'string'},
        {name: 'notification_time_interval', type: 'int'},
        {name: 'notification_time_interval_unit', type: 'int'},
        {name: 'is_enabled', type: 'int'},
        {name: 'selected',type: 'boolean', defaultValue: false}
    ]
});