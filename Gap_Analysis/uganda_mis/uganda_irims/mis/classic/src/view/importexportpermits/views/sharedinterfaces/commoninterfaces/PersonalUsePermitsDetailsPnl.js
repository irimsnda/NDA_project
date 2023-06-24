
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.PersonalUsePermitsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'personalusepermitsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'personalusepermitsdetailsfrm',//importexportdetailsfrm
        autoScroll: true,
        title: 'Permit Declaration Information'
    }, {
        xtype: 'personalusepermitsproductsgrid',
        title: 'Permits Products Details',
    },  {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


