Ext.define('Admin.view.configurations.views.panels.SamplingReasonPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'samplingreason',
    title: 'Sampling Reason',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'samplingreasonGrid'
        }
    ]
});
