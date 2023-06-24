Ext.define('Admin.view.summaryreport.revenue.form.DepartmentalReportRepresentationViewFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'departmentalReportRepresentationViewFrm',
	margin: 2,
	layout: 'fit',
	listeners:{
		//afterRender: 'init_load_Filters',
	},
   items: [{
     	xtype: 'tabpanel',
     	defaults: {
        bodyPadding: 10,
        scrollable: true,
         },
        
        items: [{
        	xtype: 'panel',
        	layout: 'fit',
        	title: 'Graphical Representation',
        	items: [{
			        xtype: 'cartesian',
			        reference: 'chart',
                    requires: ['Ext.chart.theme.Muted'],
                    listeners:{
	                    beforerender: {
				                fn: 'setReportGlobalStore',
					            config: {
					                pageSize: 100,
					                storeId: 'DepartmentalRevenueReportchartstr',
					                proxy: {
					                     url: 'summaryreport/getRevenueSummaryReports',
					                }
							      },
							    isLoad: true
							  }
						},
			        legend: {
			            type: 'sprite',
			            docked: 'right'
			        },
			        insetPadding: {
			            top: 40,
			            left: 0,
			            right: 10,
			            bottom: 40
			        },
			        sprites: [{
			            type: 'text',
			            text: 'Revenue Report Chart',
			            fontSize: 22,
			            width: 100,
			            height: 30,
			            x: 40, // the sprite x position
			            y: 20  // the sprite y position
			        }],
			        axes: [{
			            type: 'numeric',
			            position: 'left',
			            adjustByMajorUnit: true,
			            grid: true,
			            fields: ['payments'],
			            renderer: 'onAxisLabelRender',
			            minimum: 0
			        }, {
			            type: 'category',
			            position: 'bottom',
			            grid: true,
			            fields: ['Section'],
			            label: {
			                rotate: {
			                    degrees: 0
			                }
			            }
			        }],
			        series: [{
			            type: 'bar',
			            title: ['Received Revenue Payments', 'Revenue Credit Notes', 'Revenue Retention Payments'],
			            xField: ['Section'],
			            yField: ['payments', 'credit_notes', 'retention_payment'],
			            stacked: false,
			            style: {
			                opacity: 0.80,
			                minGapWidth: 20,
						    maxBarWidth: 300,
			            },
			            highlight: {
			                fillStyle: 'green',
			                opacity: 0.8
			            },
			            tooltip:{ 
                              trackMouse:true, 
							  scope: this, 
							  renderer:function(toolTip, storeItem, item){
							   toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('Section') );
							   }
                         }
			        }]
                }],
             },
          {
        	xtype: 'gridpanel',
        	title: 'Tabular Representation',
        	plugins: [{
			        ptype: 'gridexporter'
			    }],
			listeners: {
            beforerender: {
                fn: 'setReportGlobalStore',
	            config: {
	                pageSize: 100,
	                storeId: 'DepartmentalRevenueReportgridstr',
	                groupField: 'Section',
	                proxy: {
	                     url: 'summaryreport/getRevenueSummaryReports',
	                }
			      },
			    isLoad: true
			  },
			  afterRender: 'Grid_LoadreportFilters',    
		    },
		    features: [{
				 groupHeaderTpl: 'From: {name}',
				 startCollapsed: true,
                 ftype: 'groupingsummary'
			    }],
        	columns: [{
                text: 'Module',
                sortable: false,
                flex: 1,
                dataIndex: 'Module',
                summaryRenderer: function(){
			            return '<b>Totals:</b>';
			        }
            },{
                text: 'Sub_module',
                sortable: false,
                flex: 1,
                dataIndex: 'sub_module_name'
            }, {
                text: 'Payments',
                flex: 1,
                dataIndex: 'payments',
                summaryType: 'sum',
            }, {
                text: 'Credit Notes',
                flex: 1,
                dataIndex: 'credit_notes',
                summaryType: 'sum',
            },
            {
                text: 'Retention Payments',
                flex: 1,
                dataIndex: 'retention_payment',
                summaryType: 'sum',
            }

            ],
            
         
         }]
     }]
     });