
Ext.define('Admin.view.importexportpermits.views.dashboard.ControlledDrugsLicensePermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'controlleddrugslicensepermitsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    viewModel: {
       type: 'importexportpermitsvm'
       },
    items: [
        {
            xtype: 'controlleddrugslicensepermitsdash'
        }
    ]
});