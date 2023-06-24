Ext.define('Admin.view.configurations.views.panels.BankBranchesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'bankBranches',
    title: 'Bank Branches',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'bankBranchesGrid'
        }
    ]
});
