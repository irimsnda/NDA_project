Ext.define('Admin.view.summaryreport.registration.form.PremiseRegistrationReportRepresentationViewFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'premiseregistrationreportRepresentationViewFrm',
	margin: 2,
	layout: 'fit',
   items: [{
     	xtype: 'tabpanel',
     	defaults: {
        bodyPadding: 10,
        scrollable: true
        },
        items: [
	          {
	        	xtype: 'gridpanel',
	        	title: 'Tabular Representation',
	        	listeners: {
				        beforerender: {
				            fn: 'setConfigGridsStore',
				            config: {
				                pageSize: 1000,
				                groupField: 'SubModule',
				                storeId: 'premiseRegistrationReportStr',
				                proxy: {
				                    url: 'summaryreport/getPremiseGridRegistrationReport',
				                    extraParams: {
				                            module_id: 2
				                        }
				                }
				            },
				            isLoad: false
				          }
				       },
	        	plugins: [{
				        ptype: 'gridexporter'
				    }],
			    features: [{
					 //groupHeaderTpl: 'SubModule: {SubModule}',
					 startCollapsed: true,
			         ftype: 'groupingsummary'
			    }],
	        	columns: [{
	                text: 'Section',
	                sortable: false,
	                flex: 1,
	                dataIndex: 'section_name',
	                summaryRenderer: function(){
				            return '<b>Grand Total:</b>';
				        }
	            },{
	                text: 'Directorate',
	                sortable: false,
	                flex: 1,
	                dataIndex: 'directorate_name'
	            },{
	                text: 'premise Type',
	                sortable: false,
	                flex: 1,
	                hidden: true,
	                dataIndex: 'premise_type_name'
	            },{
	                text: 'Business Type',
	                sortable: false,
	                flex: 1,
	                hidden: true,
	                dataIndex: 'business_type_name'
	            },{
	                text: 'Business Scale',
	                sortable: false,
	                flex: 1,
	                hidden: true,
	                dataIndex: 'business_scale_name'
	            },{
	                text: 'Brought Forward',
	                flex: 1,
	                hidden: true,
	                dataIndex: 'brought_forward',
			        summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },

	            }, {
	                text: 'Received Applications',
	                flex: 1,
	                dataIndex: 'received_applications',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            },{
	                text: 'Total',
	                flex: 1,
	                hidden: true,
	                dataIndex: 'total',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            }, {
	                text: 'Evaluated',
	                flex: 1,
	                hidden: true,
	                dataIndex: 'evaluated_applications',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            },
	            {
	                text: 'Approved',
	                flex: 1,
	                dataIndex: 'approved',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            },
	            {
	                text: 'Rejected',
	                flex: 1,
	                dataIndex: 'rejected',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            },
	            {
	                text: 'Queried',
	                flex: 1,
	                dataIndex: 'queried',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            },
	            {
	                text: 'Carried Forward',
	                flex: 1,
	                hidden: true,
	                dataIndex: 'carried_forward',
	                summaryType: 'sum',
			        summaryRenderer: function(value){
			                     return(value);
	                  },
	            }
	        ],
	        bbar: [{
			        xtype: 'pagingtoolbar',
			        width: '100%',
			        displayInfo: true,
			        hidden: false,
			        displayMsg: 'Showing {0} - {1} out of {2}',
			        emptyMsg: 'No Records',
			        beforeLoad: function() {
			        		var grid=this.up('grid'),
			        			form=grid.up('form'),
			        			con=form.up('form'),
			        		       sub_module_id = con.down('combo[name=sub_module_id]').getValue(),
						           premise_type = con.down('combo[name=premise_type_id]').getValue(),
						           section_id = con.down('combo[name=section_id]').getValue(),
						           directorate_id = con.down('combo[name=directorate_id]').getValue(),
											 business_scale = con.down('combo[name=business_scale_id]').getValue(),
											 
						           zone_id = con.down('combo[name=zone_id]').getValue(),
						           business_type = con.down('combo[name=business_type_id]').getValue(),
						           received_opt = con.down('combo[name=received_opt]').getValue(),
						           evaluation_opt = con.down('combo[name=evaluation_opt]').getValue(),
						           from_date = con.down('datefield[name=from_date]').getValue(),
						           to_date = con.down('textfield[name=to_date]').getValue(),
						       // cont2=con.up('form'),
						           module_id=con.down('hiddenfield[name=module_id]').getValue();

			        		 var store=this.getStore();
			        		 store.getProxy().extraParams = {
			                        sub_module_id:sub_module_id,
			                        section_id: section_id,
			                        directorate_id: directorate_id,
			                        module_id:module_id,
			                        business_scale: business_scale,
			                        business_type: business_type,
			                        from_date: from_date,
			                        received_opt: received_opt,
			                        evaluation_opt: evaluation_opt,
															to_date: to_date,
															zone_id:zone_id,
			                        premise_type: premise_type

			                }
			                
			        	},
			        
			        
			    }],
	            
	      },{
        	xtype: 'panel',
        	layout: 'fit',
        	title: 'Graphical Representation',
        	items: [{
			        xtype: 'cartesian',
			        listeners: {
				        beforerender: {
				            fn: 'func_setStore',
				            config: {
				                pageSize: 1000,
				                storeId: 'premiseRegistrationReportCartesianStr',
				                proxy: {
				                    url: 'summaryreport/getPremiseRegistrationCartesianReport',
				                    extraParams: {
			                           module_id: 2
			                        }
				                }
				            },
				            isLoad: true
				          }
			       },
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
			            fields: ['premise_type'],
			            label: {
			                rotate: {
			                    degrees: 20
			                }
			            },
			           style: {
					        estStepSize: 20  
					    },

			        }],
			        series: [{
			            type: 'bar',
			            title: [ 'Brought Forward', 'Received Applications', 'Evaluated Applications', 'Approved Applications','Rejected Applications', 'Queried Applications', 'Carried Forward' ],
			            xField: ['premise_type'],
			            yField: ['brought_forward', 'received_applications', 'evaluated_applications', 'approved',' rejected', 'queried', 'carried_forward'],
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
							    toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('premise_type') );
							  }
                         }
			        }]
                }],
             }]
     }]
     });