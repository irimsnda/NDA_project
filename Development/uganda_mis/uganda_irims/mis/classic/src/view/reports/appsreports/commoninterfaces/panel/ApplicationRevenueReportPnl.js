Ext.define('Admin.view.reports.appsreports.commoninterfaces.panel.ApplicationRevenueReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'applicationrevenuereportpnl',
	margin: 2,
	layout: 'border',
    controller: 'reportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
            xtype:'hiddenfield',
            name: 'cartesianStr',
        },{
            xtype:'hiddenfield',
            name: 'gridStr'
        },{
            xtype: 'appreportrevenuefiltersfrm',
            region: 'north'
         },{
            xtype: 'revenueReportRepresentationView',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
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
                    store: ['All Payments(Inclusive of Retentions)','All Payments(Exclusive of Retentions)'],
                   /*listeners: {
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
                    }*/
         },{
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
            text: 'Export Detailed Reports',
            handler: 'func_exportRevenueReport',
            xFileName: 'ProductRevenueSummaryReport',
            xPrintFunc: 'getProductsRevenue'
        }
    ]
     }],
     listeners: {
       afterrender: 'func_InitloadStore'
     }

 });