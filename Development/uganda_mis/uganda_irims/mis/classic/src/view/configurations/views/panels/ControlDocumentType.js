Ext.define('Admin.view.configurations.views.panels.ControlDocumentType', {
    extend: 'Ext.panel.Panel',
    xtype: 'controldocumenttypes',
    title: 'Control Document Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'controldocumenttypeGrid'
        }
    ],

});