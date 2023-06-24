/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.PaymentCancellationRequestsDash', {
    extend: 'Ext.Container',
    xtype: 'paymentcancellationrequestsdash',
    layout: 'fit',
    items: [{
            xtype:'hiddenfield',
            name: 'module_id',
            value: 16
        },{
            xtype:'hiddenfield',
            name: 'sub_module_id',
            value: 43
        },
        {
            xtype: 'paymentcancellationrequestsgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]
});