Ext.define('Admin.view.summaryreport.registration.form.ImportExportRegistrationReportRepresentationViewFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'importexportregistrationreportRepresentationViewFrm',
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
			                storeId: 'importexportRegistrationReportStr',
			                proxy: {
			                    url: 'summaryreport/getImportExportGridRegistrationReport',
			                    extraParams: {
			                            module_id: 4
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
                text: 'Permit Type',
                sortable: false,
                flex: 1,
                dataIndex: 'type_category'
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
					           type_category = con.down('combo[name=type_category]').getValue(),
					           section_id = con.down('textfield[name=section_id]').getValue(),
					           directorate_id = con.down('textfield[name=directorate_id]').getValue(),
					           received_opt = con.down('textfield[name=received_opt]').getValue(),
					           evaluation_opt = con.down('textfield[name=evaluation_opt]').getValue(),
					           from_date = con.down('datefield[name=from_date]').getValue(),
										 to_date = con.down('datefield[name=to_date]').getValue(),
										 
					           zone_id = con.down('combo[name=zone_id]').getValue(),
					      //  cont2=con.up('form'),
					           module_id=con.down('hiddenfield[name=module_id]').getValue();

		        		 var store=this.getStore();
		        		 store.getProxy().extraParams = {
		                        sub_module_id:sub_module_id,
		                        section_id: section_id,
		                        directorate_id: directorate_id,
		                        module_id:module_id,
		                        type_category: type_category,
														from_date: from_date,
														zone_id:zone_id,
		                        received_opt: received_opt,
		                        evaluation_opt: evaluation_opt,
		                        to_date: to_date

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
				                storeId: 'importexportRegistrationReportCartesianStr',
				                proxy: {
				                    url: 'summaryreport/getImportExportRegistrationCartesianReport',
				                    extraParams: {
			                           module_id: 4
			                        }
				                }
				            },
				            isLoad: false
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
			            fields: ['type_category'],
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
			            title: [ 'Brought Forward', 'Received Applications', 'Approved Applications','Rejected Applications', 'Queried Applications', 'Carried Forward' ],
			            xField: ['type_category'],
			            yField: ['brought_forward', 'received_applications', 'approved',' rejected', 'queried', 'carried_forward'],
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
							    toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('type_category') );
							  }
                         }
			        }]
                }],
             }]
         }]
     });