Ext.define('Admin.view.configurations.views.panels.SponsorsNaturePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sponsorsnature',
    title: 'Sponsors Nature',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'sponsorsnatureGrid'
        }
    ],

});