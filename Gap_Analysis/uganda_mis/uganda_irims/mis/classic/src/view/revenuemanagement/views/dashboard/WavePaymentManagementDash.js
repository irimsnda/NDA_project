/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.WavePaymentManagementDash', {
    extend: 'Ext.Container',
    xtype: 'wavepaymentmanagementdash',
    layout: 'fit',
    items: [{
            xtype:'hiddenfield',
            name: 'module_id',
            value: 16
        },{
            xtype:'hiddenfield',
            name: 'sub_module_id',
            value: 44
        },
        {
            xtype: 'wavepaymentmanagementdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]
});