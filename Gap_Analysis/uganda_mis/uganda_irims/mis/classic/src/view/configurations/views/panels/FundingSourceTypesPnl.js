Ext.define('Admin.view.configurations.views.panels.FundingSourceTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'fundingsourcetypes',
    title: 'Funding Source Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'fundingsourcetypesGrid'
        }
    ],

});
