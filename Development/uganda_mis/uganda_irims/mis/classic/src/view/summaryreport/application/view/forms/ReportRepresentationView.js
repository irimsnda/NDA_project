Ext.define('Admin.view.summaryreport.application.form.ReportRepresentationView', {
	extend: 'Ext.form.Panel',
	xtype: 'reportRepresentationView',
	margin: 2,
	layout: 'fit',
   items: [{
     	xtype: 'tabpanel',
     	defaults: {
        bodyPadding: 10,
        scrollable: true
        },
        items: [{
        	xtype: 'panel',
        	layout: 'fit',
        	title: 'Graphical Representation',
        	items: [{
			        xtype: 'cartesian',
			        reference: 'chart',
                    requires: ['Ext.chart.theme.Muted'],

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
			            text: 'Applications Report Chart',
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
			            fields: ['received_applications'],
			            renderer: 'onAxisLabelRender',
			            minimum: 0
			        }, {
			            type: 'category',
			            position: 'bottom',
			            grid: true,
			            fields: ['section_name'],
			            label: {
			                rotate: {
			                    degrees: 0
			                }
			            }
			        }],
			        series: [{
			            type: 'bar',
			            title: [ 'Received', 'Granted', 'Rejected', 'Queried', 'Fast_Tracked_Application','Query Response' ],
			            xField: ['section_name'],
			            yField: ['received_applications', 'granted_applications', 'rejected', 'queried','fast_tracked','query_response'],
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
							    toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('section_name') );
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
        	columns: [{
                text: 'SubModule',
                sortable: false,
                flex: 1,
                dataIndex: 'sub_module_name'
            }, {
                text: 'Received Applications',
                flex: 1,
                dataIndex: 'received_applications'
            }, {
                text: 'Granted',
                flex: 1,
                dataIndex: 'granted_applications'
            },
                {
                    text: 'Rejected',
                    flex: 1,
                    dataIndex: 'rejected'
                },
                {
                    text: 'Queried',
                    flex: 1,
                    dataIndex: 'queried'
                },
                {
                    text: 'Fast Tracked',
                    flex: 1,
                    dataIndex: 'fast_tracked'
                },
                {
                    text: 'Query Response',
                    flex: 1,
                    dataIndex: 'query_response'
                }
            ],
            features: [{ftype:'grouping',startCollapsed: true}],
            /*dockedItems: [
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
					],*/
            
         }]
     }]
     });