/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.AdhocInvoicingProcessDash', {
    extend: 'Ext.Container',
    xtype: 'adhocinvoicingprocessdash',
    layout: 'fit',
    items: [{
            xtype:'hiddenfield',
            name: 'module_id',
            value: 17
        },{
            xtype: 'adhocinvoicingprocessdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]

});