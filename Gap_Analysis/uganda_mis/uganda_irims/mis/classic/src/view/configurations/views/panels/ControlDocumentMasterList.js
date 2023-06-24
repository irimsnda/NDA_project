Ext.define('Admin.view.configurations.views.panels.ControlDocumentMasterList', {
    extend: 'Ext.panel.Panel',
    xtype: 'controldocumentmasterlist',
    title: 'Control Document Master List',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'controldocumentmasterlistGrid'
        }
    ],

});