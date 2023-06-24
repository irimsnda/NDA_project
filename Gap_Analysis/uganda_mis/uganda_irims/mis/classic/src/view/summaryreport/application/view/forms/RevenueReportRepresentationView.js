Ext.define('Admin.view.summaryreport.application.form.RevenueReportRepresentationView', {
	extend: 'Ext.form.Panel',
	xtype: 'revenueReportRepresentationView',
	margin: 2,
	layout: 'fit',
   items: [{
     	xtype: 'tabpanel',
     	defaults: {
        bodyPadding: 10,
        scrollable: true,
        listeners: {
            activate: 'func_onTabActive'
            }
         },
        
        items: [{
        	xtype: 'panel',
        	layout: 'fit',
        	title: 'Graphical Representation',
        	items: [{
			        xtype: 'cartesian',
			        reference: 'chart',
                    requires: ['Ext.chart.theme.Muted'],

			      //  store: "productRevenueReportchartstr", //set by controller
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
        	//store: 'productRevenueReportgridstr', //set by controller
        	plugins: [{
			        ptype: 'gridexporter'
			    }],
			features: [{
				 groupHeaderTpl: 'Section: {Section}',
				 startCollapsed: true,
                 ftype: 'groupingsummary'
			    }],
        	columns: [{
						header:'Section',
						dataIndex: 'Section',
							flex: 1
					},{
                text: 'SubModule',
                sortable: false,
                flex: 1,
                dataIndex: 'sub_module_name',
                summaryRenderer: function(){
			            return '<b>Totals:</b>';
			        }
            }, {
                text: 'Payments',
                flex: 1,
                dataIndex: 'payments',
                summaryType: 'sum',
                summaryRenderer: function(value){
                     return('Amount. '+value);
                  },
                renderer: function (value, metaData, record, row, col, store, gridView) {
                	return('Amount. '+value);
                }
            }, {
                text: 'Credit Notes',
                flex: 1,
                dataIndex: 'credit_notes',
                summaryType: 'sum',
                summaryRenderer: function(value){
                     return('Amount. '+value);
                  },
                renderer: function (value, metaData, record, row, col, store, gridView) {
                	return('Amount. '+value);
                }
            },
                {
                    text: 'Retention Payments',
                    flex: 1,
                    dataIndex: 'retention_payment',
                    summaryType: 'sum',
                    summaryRenderer: function(value){
                        return('Amount. '+value);
                        },
                     renderer: function (value, metaData, record, row, col, store, gridView) {
                	   return('Amount. '+value);
                }
                }
            ],
           
          /*  dockedItems: [
					    {
					        xtype: 'toolbar',
					        flex: 1,
					        dock: 'bottom',
					        ui: 'soft-green',
					        layout: {
					            pack: 'end',
					            type: 'hbox'
					        },
					        items: [
					            {
					                xtype: 'exportbtn',
					               
					            }
					        ]
					    }
					],
            */
         }]
     }]
     });