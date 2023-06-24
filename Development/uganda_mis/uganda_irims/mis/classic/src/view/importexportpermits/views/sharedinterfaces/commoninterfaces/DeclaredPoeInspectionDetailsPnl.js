
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.DeclaredPoeInspectionDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'declaredpoeinspectiondetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'poeinspectionpnlfrm',
        autoScroll: true,
        collapsible: true,
        height: 250,
        title: 'Import/Export Inspection Details',
        buttons:[{
            text:'Save Inspection Details',
            iconCls:'x-fa fa-save',
            ui:'soft-purple',
            action_url:'savePOEInspectionPermitDetails',
            handler:'funcSavePOEInspectionPermitDetails'
        }]
    }, {
        xtype: 'declaredpoeinspectionpermitsproductsgrid',
        region: 'center',
        title: 'Declared Permit Products Details',
    },  {
        xtype: 'previousinspectionsgrid',
        autoScroll:true,
        region: 'south',
        title: 'Previous Inspections',
        
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


