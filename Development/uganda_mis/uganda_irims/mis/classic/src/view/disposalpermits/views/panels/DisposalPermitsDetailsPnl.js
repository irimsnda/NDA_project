
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.disposalpermits.views.panels.DisposalPermitsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'disposalpermitsdetailspnl',
    // layout: {//
    //     type: 'fit'
    // }, 
    autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'disposalpermitsdetailsfrm',
        autoScroll: true,
        itemId:'disposalpermitsdetailsfrm',
        title: 'Disposal Application Information'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});