Ext.define('Admin.view.configurations.views.panels.InvestigationalProductSectionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'investigationalProductSection',
    title: 'Investigational Product Section',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'investigationalProductSectionGrid'
        }
    ]
});
