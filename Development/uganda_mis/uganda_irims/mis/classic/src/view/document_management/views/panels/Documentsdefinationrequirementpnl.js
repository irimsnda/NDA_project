/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.panels.Documentsdefinationrequirementpnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentsdefinationrequirementpnl',
    title: 'Documents Defination Requiments Setup',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
	
    items: [
        {
            xtype: 'docdefinationrequirementgrid',
			
			flex: 0.6
        }
    ]
});
