Ext.define('Admin.view.configurations.views.panels.CT_PersonnelPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'ct_personnel',
    title: 'Clinical Trial Personnel',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'ct_personnelGrid'
        }
    ]
});
