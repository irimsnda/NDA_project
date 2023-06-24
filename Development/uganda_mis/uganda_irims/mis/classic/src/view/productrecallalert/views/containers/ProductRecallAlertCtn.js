/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 17/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.containers.ProductRecallAlertCtn', {
    extend: 'Ext.Container',
    xtype: 'productRecallAlertCtn',    
	itemId:'productRecallAlertCtn',
    controller: 'productRecallAlertVctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'productRecallAlertDashWrapper',
            region: 'center'
        },
        {
            xtype: 'productRecallAlertTb',
            region: 'south'
        }
    ]
});