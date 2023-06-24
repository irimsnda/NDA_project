Ext.define('Admin.view.configurations.views.panels.ImportExportPermitFeesConfig', {
    extend: 'Ext.panel.Panel',
    xtype: 'importexportpermitfeesconfig',
    title: 'Import/Export Fee Configurations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'importexportpermitfeesconfiggrid'
        }
    ],

});
