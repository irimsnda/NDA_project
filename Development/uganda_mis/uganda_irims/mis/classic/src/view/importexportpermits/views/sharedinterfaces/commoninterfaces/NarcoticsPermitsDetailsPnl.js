
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.NarcoticsPermitsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'narcoticspermitsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype:'panel',
        title:'Permit Details',
        layout:'border',
        autoScroll:true,
        items:[{
            xtype: 'narcoticsdrugspermitsdetailsfrm',
            autoScroll: true,
          collapsible: true,
            region:'north',
            height:270,
            title: 'Narcotics Permit Information'
        }, {
            xtype: 'senderreceiverdetailsfrm',
            collapsible: true,
            region:'center',
            autoScroll: true,
            title: 'Sender/Receiver Details',
        }]

    } ,{
        xtype: 'narcoticsdrugspermitsproductsgrid',
        title: 'Narcotics Permit Products Details',
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


