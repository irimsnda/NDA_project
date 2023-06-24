Ext.define('Admin.view.configurations.views.panels.OrgBanksAccountPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'orgBanksAccount',
    title: 'OrgBank Accounts',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'orgBanksAccountGrid'
        }
    ]
});
