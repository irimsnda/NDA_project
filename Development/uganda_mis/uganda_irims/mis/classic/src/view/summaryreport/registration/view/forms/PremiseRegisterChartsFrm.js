Ext.define('Admin.view.summaryreport.registration.view.forms.PremiseRegisterChartsFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'premiseRegisterChartFrm',
	layout: 'fit',
	title: 'Graphical Representation',
	defaults:{
		bodyPadding: 1,
        margins: '0 0 0 0',
	},
	listeners:[{
		beforerender: 'setPremiseRegisterCartesianStr'
	}],
   items: [{
        	xtype: 'panel',
        	layout: 'fit',
        	items: [{
			        xtype: 'cartesian',
			        reference: 'chart',
			        //flipXY: true,
                    requires: ['Ext.chart.theme.Muted'],
			        legend: {
			            type: 'sprite',
			            docked: 'right'
			        },
			        insetPadding: {
			            top: 40,
			            left: 40,
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
			            fields: ['approved'],
			            renderer: 'onAxisLabelRender',
			            minimum: 0,
			        }, {
			            type: 'category',
			            position: 'bottom',
			            grid: true,
			            fields: ['zone_name'],
			            label: {
			                rotate: {
			                    degrees: 45,
			                    fontSize: 15
			                }
			            }
			        }],
			        series: [{
			            type: 'bar',
			            title: ['Approved','Rejected'],
			            xField: ['zone_name'],
			            yField: ['approved','rejected'],
			            stacked: false,
			            style: {
			                opacity: 0.80,
			                minGapWidth: 20,
						    maxBarWidth: 400,
			            },
			            highlight: {
			                fillStyle: 'green',
			                opacity: 0.8
			            },
			            tooltip:{ 
                              trackMouse:true, 
							  scope: this, 
							  renderer:function(toolTip, storeItem, item){
							   toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+' In '+storeItem.get('zone_name') );
							   }
                         }
			        }]
                }],
             }
         
          ]
   

});


