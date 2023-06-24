Ext.define('Admin.view.sampleinventory.views.configurations.panel.SampleIssueReasonsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampleissuereasons',
    title: 'Sample Issue Reason',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'sampleissuereasonsGrid'
        }
    ]
});
