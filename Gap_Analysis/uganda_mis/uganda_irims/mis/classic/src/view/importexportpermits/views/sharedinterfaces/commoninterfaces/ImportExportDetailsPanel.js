/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.ImportExportDetailsPanel', {
    extend: 'Admin.view.importexportpermits.views.commoninterfaces.ImportExportDetailsPnl',
    xtype: 'importexportdetailspanel',
    controller: 'importexportpermitsvctr',
    layout: {
        type: 'fit'
    },
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'importexportpermitsvm'
    },
    height: 550,
    bbar:[{
        text: 'Update Permit Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'save_btn',
        action_url: 'importexportpermits/onSavePermitinformation',
        handler: 'savePermitInformation'
    }]
});