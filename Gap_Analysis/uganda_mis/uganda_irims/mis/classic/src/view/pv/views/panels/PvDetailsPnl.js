Ext.define('Admin.view.pv.views.panels.PvDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'pvDetailsPnl',
    // layout: {//
    //     type: 'fit'
    // },
    controller: 'pvvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    itemId: 'pvDetailsPnlId', 
    viewModel: {
        type: 'pvvm'
    },
    listeners: {
        tabchange: 'funcActiveOtherPvInformationTab'
    },
    items: [{
        xtype: 'panel',
        itemId:'detailspanel',
        title: 'Patient Details',
        autoScroll: true,
        items:[{
            xtype: 'pvDetailsFrm',
            autoScroll: true,
        }]
    },{
        xtype: 'pvSuspectedDrugGrid',
        title: 'Suspected Medicine/Vaccine/Device',
    },{
        xtype: 'pvSuspectedDrugGrid',
        is_other_drugs_used: 1,//1 when called from other drug used grid
        title: 'Other Medicine/Vaccine/Device Used',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'pv_id',
        value: ''
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});