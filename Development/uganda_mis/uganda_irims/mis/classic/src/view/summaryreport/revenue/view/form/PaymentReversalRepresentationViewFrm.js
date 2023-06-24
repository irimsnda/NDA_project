Ext.define('Admin.view.summaryreport.revenue.form.PaymentReversalRepresentationViewFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'paymentReversalRepresentationViewFrm',
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
					                storeId: 'paymentReversalReportchartstr',
					                proxy: {
					                     url: 'summaryreport/getPaymentReversalsSummaryReports',
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
			            text: 'Reversals Report Chart',
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
			            fields: ['total_reversed'],
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
			            title: ['Received Reversals Requests', 'Processed Reversals','Total Amount Reversed'],
			            xField: ['Module'],
			            yField: ['reversal_requests', 'handled_request','amount_reversed'],
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
          },{
        	xtype: 'gridpanel',
        	title: 'Tabular Representation',
        	listeners: {
	            beforerender: {
	                fn: 'setReportGlobalStore',
		            config: {
		                pageSize: 100,
		                storeId: 'paymentReversalReportgridstr',
		                groupField: 'Module',
		                proxy: {
		                     url: 'summaryreport/getPaymentReversalsSummaryReports',
		                }
				      },
				    isLoad: true
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
                text: 'Totals Amount Reversed',
                flex: 1,
                dataIndex: 'amount_reversed',
                summaryType: 'sum',
            }, {
                text: 'Received Reversals Requests',
                flex: 1,
                dataIndex: 'reversal_requests',
                summaryType: 'sum'
            },{
                text: 'Processed Reversals',
                flex: 1,
                dataIndex: 'handled_request',
                summaryType: 'sum'
            }
            ],
            
         
         }]
     }]
     });