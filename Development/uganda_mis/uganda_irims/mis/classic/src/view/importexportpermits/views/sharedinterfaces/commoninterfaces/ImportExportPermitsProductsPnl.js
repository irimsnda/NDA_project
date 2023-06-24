
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ImportExportPermitsProductsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'importexportpermitsproductspnl',
    layout: {//
        type: 'fit'
    },
    items:[{
        xtype: 'registerednonregisteredprodgrid',
        region: 'center',
        collapsible: true
    }]
});