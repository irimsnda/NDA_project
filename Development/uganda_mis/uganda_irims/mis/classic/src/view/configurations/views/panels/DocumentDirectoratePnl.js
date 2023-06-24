Ext.define('Admin.view.configurations.views.panels.DocumentDirectoratePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentdirectorate',
    title: 'Document Directorate',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'documentdirectorateGrid'
        }
    ],

});
