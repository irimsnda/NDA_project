
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.InspectionImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'inspectionimportexportdetailspnl',
    
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'panel',
        autoScroll: true, 
        itemId:'permitsdetails_panel', 
        viewModel: 'importexportpermitsvm',
        title: 'Application Details(Permit, Sender/Receiver, Premises Licenses Outlets)',
        items:[{
            xtype: 'importexportinspectionbookingdetailsfrm',
            autoScroll: true,
            title: 'Permit & Inspection Booking Information'
        }, {
            xtype: 'senderreceiverdetailsfrm',
            title: 'Supplier/Receiver Details',
        },{
            xtype: 'importexportpermitsproductsgrid', 
            autoScroll: true,
            height: 400,
            hidden: true,
            title: 'Permit Products Details',
        },{
            xtype: 'importexportpremisesfrm',
            title: 'Licensed Outlet Details',
        }] 
    },  {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


