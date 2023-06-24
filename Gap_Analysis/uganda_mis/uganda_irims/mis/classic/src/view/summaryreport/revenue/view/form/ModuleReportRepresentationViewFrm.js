Ext.define('Admin.view.summaryreport.revenue.form.ModuleReportRepresentationViewFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'moduleReportRepresentationViewFrm',
	margin: 2,
	layout: 'fit',
	listeners:{
		//afterRender: 'init_load_Filters',
	},
   items: [{
     	xtype: 'tabpanel',
     	defaults: {
		        
		        scrollable: true,
           },
        items: [{
        	xtype: 'gridpanel',
        	title: 'Revenue Summary Report',
        	listeners: {
	            beforerender: {
	                fn: 'setReportGlobalStore',
		            config: {
		                pageSize: 100,
		                storeId: 'ModularRevenueReportgridstr',
		                groupField: 'Module',
		                proxy: {
		                     url: 'summaryreport/getRevenueSummaryReports',
		                }
				      },
				    isLoad: false
				  },
				  afterRender: 'Grid_LoadreportFilters',
		           
		    },
        	plugins: [{
			        ptype: 'gridexporter'
			    }],
			features: [{
				 groupHeaderTpl: 'From: {name}',
				 startCollapsed: true,
                 ftype: 'groupingsummary'
			    }],
        	columns: [{
                text: 'SubModule',
                sortable: false,
                flex: 1,
                dataIndex: 'sub_module_name',
                summaryRenderer: function(){
			            return '<b>Totals:</b>';
			        }
            },{
                text: 'Section',
                sortable: false,
                flex: 1,
                dataIndex: 'Section'
            },  {
                text: 'Payments',
								flex: 1,
								renderer: Ext.util.Format.numberRenderer('0,000.00'),
								dataIndex: 'payments',

								summaryType: 'sum',
								summaryRenderer: function(value){
													
																	return('Total. '+ Ext.util.Format.number(value, "0,000.00"));
									},
																
								
            }, {
                text: 'Credit Notes',
								flex: 1,
								hidden: true,
                dataIndex: 'credit_notes',
                summaryType: 'sum'
            },{
                text: 'Retention Payments',
                flex: 1,	hidden: true,
                dataIndex: 'retention_payment',
                summaryType: 'sum'
            }
            ],
            
         },{
        	xtype: 'panel',
					layout: 'fit',
					hidden: true,
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
					                storeId: 'ModularRevenueReportchartstr',
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
			            fields: ['Module'],
			            label: {
			                rotate: {
			                    degrees: 0
			                }
			            }
			        }],
			        series: [{
			            type: 'bar',
			            title: ['Received Revenue Payments', 'Revenue Credit Notes', 'Revenue Retention Payments'],
			            xField: ['Module'],
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
							   toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('Module') );
							   }
                         }
			        }]
                }],
          }]
     }]
     });