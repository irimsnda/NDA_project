Ext.define('Admin.view.summaryreport.application.view.panel.ProductRevenueReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'productRevenueReportPnl',
	margin: 2,
	layout: 'border',
    controller: 'reportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
            xtype:'hiddenfield',
            name: 'cartesianStr', //value set from controller
        },{
            xtype:'hiddenfield',
            name: 'gridStr',  //value set from controller
        },{
             xtype: 'textfield',
             name: 'module_id',
             value: 1,
             hidden: true
         },{
            xtype: 'reportRevenueFilters',
            region: 'north'
         },{
            xtype: 'revenueReportRepresentationView',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        added: 'alerta',
        items: [
         {
            xtype:'externalExportBtn',
            text: 'Print(Summary)',
            containerName: 'form',
            gridName: 'gridpanel' 
            
            
        },
        '->',
        {
                    xtype: 'combo',
                    emptyText: 'Revenue Types',
                    width: 250,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'revenue_types',
                    allowBlank: false,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: ['All Payments','All Payments(Exclusive of Retentions)','Credit Notes'],
                    listeners: {
                    //func
                    

                    }
                },
        {
            xtype: 'combo',
            emptyText: 'Classification',
            width: 150,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'Classification',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_classifications'
                        }
                       }
                    },
                    isLoad: true
                }
            }
        },
        
        {
            text: 'Print Detailed Report',
            handler: 'func_ExpWinShow'
            
        },{
            text: 'Export Detailed Report',
            handler: 'func_exportRevenueReport',
            xFileName: 'ProductRevenueSummaryReport',
            xPrintFunc: 'getProductsRevenue'
        }
    ]
     }],
     listeners: {
      beforerender: 'func_setDynamicStore',
       afterrender: 'func_InitloadStore'
     }

 });