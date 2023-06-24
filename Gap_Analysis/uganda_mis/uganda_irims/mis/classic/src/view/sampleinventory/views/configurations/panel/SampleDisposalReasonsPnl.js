Ext.define('Admin.view.sampleinventory.views.configurations.panel.SampleDisposalReasonsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampledisposalreasons',
    title: 'Sample Disposal Reason',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'sampledisposalreasonsGrid'
        }
    ]
});
