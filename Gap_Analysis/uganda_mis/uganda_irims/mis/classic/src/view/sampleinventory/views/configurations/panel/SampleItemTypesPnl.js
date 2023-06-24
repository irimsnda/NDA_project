Ext.define('Admin.view.sampleinventory.views.configurations.panel.SampleItemTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampleitemtypes',
    title: 'Sample Item Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'sampleitemtypesGrid'
        }
    ]
});
