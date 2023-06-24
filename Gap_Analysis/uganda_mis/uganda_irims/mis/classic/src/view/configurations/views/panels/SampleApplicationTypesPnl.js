Ext.define('Admin.view.configurations.views.panels.SampleApplicationTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampleapplicationtypes',
    title: 'Sample Application Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'sampleapplicationtypesGrid'
        }
    ]
});
