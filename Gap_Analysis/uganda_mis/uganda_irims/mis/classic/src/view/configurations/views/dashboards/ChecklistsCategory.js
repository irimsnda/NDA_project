
Ext.define('Admin.view.configurations.views.dashboards.ChecklistsCategory', {
    extend: 'Ext.container.Container',
    xtype: 'checklistsCategory',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    padding: '2 0 0 0',
    layout: {
        type: 'hbox'
    },

    items: [
        {
            xtype: 'checklistcategoriesgrid',
            flex: 1,
            resizable: true,
            split: true
        }
    ]
});
