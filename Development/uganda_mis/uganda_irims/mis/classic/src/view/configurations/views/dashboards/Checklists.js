/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.Checklists', {
    extend: 'Ext.container.Container',
    xtype: 'checklists',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    padding: '2 0 0 0',
    layout: 'border',

    items: [
        {
            xtype: 'checklisttypesgrid',
            collapsible: true,
            split: true,
            region: 'west'
        },
        {
            xtype: 'checklistitemsgrid',
            region: 'center'
        }
    ]
});
