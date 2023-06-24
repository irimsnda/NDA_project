Ext.define('Admin.view.summaryreport.revenue.view.panel.RevenueSummaryDepartmentalPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'revenueSummaryDepartmentalPnl',
	margin: 2,
	layout: 'fit',
    tbar:[{
        xtype: 'revenueFilterFrm',

    }],
    items: [{
    	    xtype: 'departmentalReportRepresentationViewFrm',
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
                     listeners: {
                          beforerender: {
                              fn: 'setOrgConfigCombosStore',
                              config: {
                                  pageSize: 100,
                                  proxy: {
                                  url: 'configurations/getConfigParamFromTable',
                                  extraParams: {
                                      table_name: 'par_payment_types'
                                  }
                                 }
                              },
                              isLoad: true
                          }
                      }
            }, {
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

 });

