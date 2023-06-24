Ext.define('Admin.view.importexportpermits.views.grids.common_grids.SenderReceiverSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicantSelectionCmnGrid',
    controller: 'registrationvctr',
    xtype: 'senderreceiverselectiongrid',
     storeConfig:{
        config: {
            pageSize: 200, 
            remoteFilter: true,
            totalProperty:'totals',
            proxy: {
                url:'importexportpermits/getSenderReceiverList'
            }
        },
        isLoad: true
    },
});