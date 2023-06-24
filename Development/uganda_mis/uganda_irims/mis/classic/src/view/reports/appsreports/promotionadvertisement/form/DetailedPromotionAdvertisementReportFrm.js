Ext.define('Admin.view.reports.appsreport.promotionadvertisementreport.form.DetailedPromotionAdvertisementReportFiltersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'detailedpromotionadvertisementreportfrm',
    margin: 2,
    height: 500,
    layout: 'fit',
	referenceHolder: true,
	reference: 'ReportDetailedExportWin',
    controller: 'productreportctr',
    module: 'promotionadvertisement',
    layout: 'border',
    items: [{
            xtype: 'textfield',
            name: 'section_id',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'module_name',
            value: 'promotionadvertisement',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'advertisement_type_id',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'xstore',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'process_class',
            hidden: true
        },{
    		xtype: 'textfield',
    		name: 'sub_module_id',
    		hidden: true
    	},{
    		xtype: 'datefield',
    		format: 'Y-m-d',
    		name: 'to_date',
    		hidden: true
    	},{
    		xtype: 'datefield',
    		format: 'Y-m-d',
    		name: 'from_date',
    		hidden: true
    	},{
            xtype: 'textfield',
            name: 'grid',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'action_url',
            value: 'promotionAdvertisementDetailedReportPreview',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'zone_id',
            hidden: true
        }
    	],
     dockedItems: [{
     	xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        dock: 'bottom',
        items: [
	        '->',
	        {
	        	
		       text: 'Export Detailed Report',
		       ui: 'soft-purple',
		       name: 'detailed',
               module: 'promotionadvertisement',
		       iconCls: 'x-fa fa-cloud-upload', 
		       handler: 'exportPromotionAdvertisementDetailedReport'
		       
	                    
	        }
           ]
     }],
     listeners: {
     	afterRender: 'loadExportPromotionAdvertisementWinStoreReload'
     }

    });