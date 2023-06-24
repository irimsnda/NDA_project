Ext.define('Admin.view.configurations.views.panels.ClinicalTrialDesignsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialdesigns',
    title: 'Clinical Trial Designs',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'clinicaltrialdesignsGrid'
        }
    ],

});
