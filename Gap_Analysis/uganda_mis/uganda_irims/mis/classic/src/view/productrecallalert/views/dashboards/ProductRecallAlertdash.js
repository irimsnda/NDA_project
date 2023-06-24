/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 18/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.dashboards.ProductRecallAlertdash', {
    extend: 'Ext.Container',
    xtype: 'productRecallAlertdash',
    layout: 'border',
    items: [
        {
            xtype: 'productRecallAlertGrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]
});