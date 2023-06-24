Ext.define('Admin.view.sampleinventory.views.panel.InventoryReportPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'inventoryReports',
	margin: 2,
	layout: 'fit',
	controller: 'sampleinventoryvctr',
	
	tbar: [{
		xtype: 'inventoryReportFilterFrm'
	}],

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
					                storeId: 'InventoryStockReportchartstr',
					                proxy: {
					                     url: 'sampleinventory/getInventoryStockReportchart',
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
			            text: 'Inventory Report Chart',
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
			            fields: ['received'],
			            renderer: 'onAxisLabelRender',
			            minimum: 0
			        }, {
			            type: 'category',
			            position: 'bottom',
			            grid: true,
			            fields: ['type'],
			            label: {
			                rotate: {
			                    degrees: 0
			                }
			            }
			        }],
			        series: [{
			            type: 'bar',
			            title: ['Received Stock', 'Issued Stock', 'Disposed Stock', 'Remainder'],
			            xField: ['type'],
			            yField: ['received', 'issued', 'disposed', 'remainder'],
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
							   toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('type') );
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
		                storeId: 'InventoryStockReportgridstr',
		                groupField: 'type',
		                proxy: {
		                     url: 'sampleinventory/getInventoryStockReportgrid',
		                }
				      },
				    isLoad: true
				  }
		           
		    },
        	plugins: [{
			        ptype: 'gridexporter'
			    }],
			features: [{
				 startCollapsed: true,
                 ftype: 'groupingsummary'
			    }],
        	columns: [{
                text: 'Type',
                sortable: false,
                flex: 1,
                dataIndex: 'type',
                summaryRenderer: function(){
			            return '<b>Totals:</b>';
			        }
            },{
                text: 'Received',
                sortable: false,
                flex: 1,
                dataIndex: 'received'
            },  {
                text: 'Issued',
                flex: 1,
                dataIndex: 'issued',
                summaryType: 'sum',
            }, {
                text: 'Disposed',
                flex: 1,
                dataIndex: 'disposed',
                summaryType: 'sum'
            },{
                text: 'Remainder',
                flex: 1,
                dataIndex: 'remainder',
                summaryType: 'sum'
            }
            ],
            
         
         }]
     }]
     });