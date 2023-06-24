/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.model.dashboard.DashboardMdl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'viewType', type: 'string'},
        {name: 'menu_id', type: 'string'},
        {name: 'routeId', type: 'string'}
    ]
});