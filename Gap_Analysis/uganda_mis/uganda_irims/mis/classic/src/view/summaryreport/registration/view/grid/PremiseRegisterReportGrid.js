Ext.define('Admin.view.summaryreport.registration.view.grid.PremiseRegisterReportGrid', {
    extend: 'Ext.tab.Panel',
    controller: 'registrationreportviewctr',
    xtype: 'premiseregisterreportGrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    width: '100%',
    
    tbar: [{
    	xtype: 'form',
    	layout: 'hbox',
    	items:[{ 
        	xtype: 'fieldset',
            style: 'margin:0px',
        	layout: 'hbox',
              items:[{
                    xtype: 'combo',
                    fieldLabel: 'Section',
                    flex: 1,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'section_id',
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
                                    table_name: 'par_sections'
                                }
                               }
                            },
                            isLoad: true
                        },
                        beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            },
                        afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},

                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'Sub Module',
                    flex: 1,
                    labelAlign : 'top',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    name: 'sub_module_id',
                    queryMode: 'local',
                    allowBlank: false,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'workflow/getSystemSubModules',
                                    extraParams: {
                                        model_name: 'SubModule',
                                       // module_id: 1
                                    }
                                }
                            },
                            isLoad: true
                        },
                         beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            },
                         afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	},
                    }
                
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    flex: 1,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'zone_id',
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
                                    extraParams: {
                                        model_name: 'Zone'
                                    }
                                }
                            },
                            isLoad: true
                        },
                       beforequery: function() {
                        	var store=this.getStore();
                        	
                            var all={name: 'All',id:0};
                              store.insert(0, all);
                            },
                        afterrender: function(combo) {
        		            		combo.select(combo.getStore().getAt(0));	
        		            	}
                    }
                }]
        },
        {
        	xtype: 'fieldset',
        	layout: 'hbox',
            style: 'margin:0px',
        	items: [{
		            xtype: 'datefield',
		            fieldLabel: 'Application From',
                    allowBlank: false,
		            flex: 1,
		            labelAlign : 'top',
		            name: 'from_date',
                    value: firstDay,
		            maxValue: new Date()  // limited to the current date or prior
		        }, {
		            xtype: 'datefield',
		            fieldLabel: 'Application To',
		            flex: 1,
                    allowBlank: false,
		            labelAlign : 'top',
		            name: 'to_date',
		            value: lastDay // defaults to today
		        }
		       ]
        },
         {         xtype: 'button',
		            text: 'Search Filter',
		            name: 'filter_SummaryReport',
		            ui: 'soft-green',
		            iconCls: 'fa fa-search',
		            handler: 'func_LoadPremiseRegisterReportFilters',
                    formBind: true,
          }]
      }],
    items: [{
    	xtype: 'grid',
    	title: 'Tabular Representation',
    	viewConfig: {
        deferEmptyText: false,
	        emptyText: 'Nothing to display'
	    },
    	plugins: [
        {
            ptype: 'gridexporter'
        }
	    ],
	    export_title: 'Premise Register',
	    bbar: [{
            xtype: 'button',
            text: 'Print Register',
            ui: 'soft-green',
            flex: 1,
            handler: 'printPremiseRegister'
        },{
	        xtype: 'pagingtoolbar',
	        width: '80%',
	        displayInfo: true,
	        displayMsg: 'Showing {0} - {1} of {2} total records',
	        emptyMsg: 'No Records',
	        beforeLoad: function() {
	        		var grid=this.up('grid'),
	        			panel = grid.up('panel'),
	        		       sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
				           zone_id = panel.down('combo[name=zone_id]').getValue(),
				           section_id = panel.down('combo[name=section_id]').getValue(),
				           to_date = panel.down('datefield[name=to_date]').getValue(),
				           from_date=panel.down('datefield[name=from_date]').getValue();

	        		 var store=this.getStore();
	        		 store.getProxy().extraParams = {
	                        sub_module_id:sub_module_id,
	                        zone_id: zone_id,
	                        section_id:section_id,
	                        to_date: to_date,
	                        from_date: from_date
	                }
	                
	        	},
	    },{
	        xtype: 'exportbtn',
	        flex: 1
	    }],
	    features: [{
	        ftype: 'groupingsummary',
	        startCollapsed: true,
	        groupHeaderTpl: 'SubModule: {[values.rows[0].data.sub_module_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
	        //hideGroupedHeader: true,
	        enableGroupingMenu: false
	    }],
	    listeners: {
	        beforerender: {
	            fn: 'setConfigGridsStore',
	            config: {
	                pageSize: 1000,
	                groupField: 'sub_module_name',
	                storeId: 'premiseregisterreportStr',
	                proxy: {
	                    url: 'summaryreport/getPremiseRegisterReport'
	                }
	            },
	            isLoad: true
	        }
	    },
	    columns: [{
	        xtype: 'gridcolumn',
	        dataIndex: 'id',
	        text: 'ID',
	        hidden: true,
	        flex: 1,
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'sub_module_name',
	        text: 'Sub Module',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'section_name',
	        text: 'Section',
	        flex: 1,
	        summaryRenderer: function(value){
	             return "<b>Grand Total:</b>"
	          },
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'zone_name',
	        text: 'Zone Name',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'approved',
	        text: 'Approved Applications',
	        flex: 1,
	        summaryType: 'sum',
	        summaryRenderer: function(value){
	             return (value)
	          },
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'rejected',
	        text: 'Rejected Applications',
	        flex: 1,
	        summaryType: 'sum',
	        summaryRenderer: function(value){
	             return (value)
	          },
	    }]
    },{
        xtype:'premiseRegisterChartFrm',
    }],
    
});
