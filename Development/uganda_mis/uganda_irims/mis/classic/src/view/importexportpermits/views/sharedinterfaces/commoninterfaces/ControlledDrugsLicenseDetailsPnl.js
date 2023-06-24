
/**
 * Created by Softclans on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ControlledDrugsLicenseDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'controlleddrugslicensedetailspnl',
    
    // layout: {//
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype:'tabpanel',
        title:'Permit Details',
        layout:'fit',
        autoScroll:true,
        items:[{
            xtype: 'controldrugslicensedetailsfrm',
            autoScroll: true,
            collapsible: true,
            title: 'Controlled Drugs License Information'
        }, {
            xtype: 'senderreceiverdetailsfrm',
            autoScroll: true,
            title: 'Consignee Details',
        }, {
            xtype: 'importexportpremisesfrm',
            autoScroll: true,
            hidden: true,
            title: 'Registered Outlets Details',
        }]

    } ,{
        xtype: 'controldrugslicensesproductsgrid',
        title: 'Control Drugs Permit Products Details',
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


