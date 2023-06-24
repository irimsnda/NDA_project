/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 18/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.dashboards.ProductRecallAlertDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'productRecallAlertDashWrapper',
	itemId:'productRecallAlertDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'productRecallAlertdash'
        }
    ]
});