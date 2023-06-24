Ext.define('Admin.view.summaryreport.registration.view.grid.BusinessTypesScaleGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registrationreportviewctr',
    xtype: 'businesstypesscaleGrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    width: '100%',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    plugins: [
    {
        ptype: 'gridexporter'
    }
    ],
    export_title: 'Business Type and scale Register',
    tbar: [{
    	xtype: 'form',
    	layout: 'column',
    	items:[{ 
        	xtype: 'fieldset',
            style: 'margin:0px',
            columnWidth: 0.6,
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Business Type',
                    flex: 1,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'business_type',
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
                                        table_name: 'par_business_types'
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
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Business Scale',
                    flex: 1,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    labelAlign : 'top',
                    displayField: 'name',
                    name: 'business_scale',
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
                                        table_name: 'par_business_scales'
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
            columnWidth: 0.3,
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
                    columnWidth: 0.1,
		            name: 'filter_SummaryReport',
		            ui: 'soft-green',
		            iconCls: 'fa fa-search',
		            handler: function(btn) {
                        var grid = this.up('grid'),
                            store = grid.getStore();
                        store.removeAll();
                        store.load();
                    },
                    formBind: true,
          }]
      }],
   
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '90%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			panel = grid.up('panel'),
                       business_type = grid.down('combo[name=business_type]').getValue(),
                       business_scale = grid.down('combo[name=business_scale]').getValue(),
			           section_id = grid.down('combo[name=section_id]').getValue(),
			           to_date = grid.down('datefield[name=to_date]').getValue(),
			           from_date=grid.down('datefield[name=from_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        business_type: business_type,
                        business_scale: business_scale,
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
        groupHeaderTpl: 'Section: {[values.rows[0].data.section_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        //hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'section_name',
                storeId: 'businesstypescaleStr',
                proxy: {
                    url: 'summaryreport/getBusinessTypeScaleReport'
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
        dataIndex: 'section_name',
        text: 'Section',
        flex: 1,
        summaryRenderer: function(value){
             return "<b>Grand Total:</b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'business_scale',
        text: 'Business Scale',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'counter',
        text: 'Counter',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }]
    
});
