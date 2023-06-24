
Ext.define('Admin.view.importexportpermits.views.dashboard.ControlledDrugsLicensePermitsDash', {
    extend: 'Ext.Container',
    xtype: 'controlleddrugslicensepermitsdash',
    layout: 'border',
    viewModel: {
           type: 'importexportpermitsvm'
       },
    items: [
        {
            xtype: 'controlleddrugslicensepermitsgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});