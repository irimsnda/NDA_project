Ext.define('Admin.view.configurations.views.panels.PmsSamplesStagesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmssamplesstages',
    title: 'PMS Sample Stages',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmssamplesstagesGrid'
        }
    ]
});