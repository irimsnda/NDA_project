/**
 * Created by Softclans on 2/11/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationqueryresponsepnl',
    controller: 'commoninterfacesVctr',
	layout:'fit',
	autoScroll: true,
	items:[{
		xtype:'tabpanel',
		layout:'fit',
		items:[{
			xtype: 'applicationqueryresponsefrm',
			region:'center',
			title:'Query Response'
		},{
			xtype: 'previewproductDocUploadsGrid',
			
			
			height: 300,
			
			title: 'Uploaded Query Documents'
		}]
	}]
});