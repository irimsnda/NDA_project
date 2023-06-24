Ext.define('Admin.view.summaryreport.premise.grid.InspectionBusinessTypesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registrationreportviewctr',
    xtype: 'inspectionbusinesstypesGrid',
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
    export_title: 'Business Type based Inspection Report',
    tbar: [{
    	xtype: 'form',
        width: '100%',
        ui: 'footer',
        layout: 'column',
        defaults: {
            columnWidth: 0.25
        },
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
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
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

            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
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
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_zones'
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
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Business Type Category',
            flex: 1,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'business_type_category',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_businesstype_categories'
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
                change: function(combo, newval, oldval, oepts){
                    var form = combo.up('form'),
                        bsn_typeStr = form.down('combo[name=business_type]').getStore(),
                        filter = JSON.stringify({'business_typecategory_id':newval});
                        bsn_typeStr.removeAll();
                        bsn_typeStr.load({params: {filters: filter}});
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
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
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
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
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },{
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
        },{
            xtype: 'button',
            text: 'Search Filter',
            name: 'filter_SummaryReport',
            ui: 'soft-green',
            style: 'margin-top:30px;',
            iconCls: 'fa fa-search',
            handler: function(btn) {
                var grid = this.up('grid'),
                    store = grid.getStore();
                store.removeAll();
                store.load();
            }
        }]
    }],
     
   
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        			panel = grid.up('panel'),
                       business_type = grid.down('combo[name=business_type]').getValue(),
                       business_type_category = grid.down('combo[name=business_type_category]').getValue(),
                       section_id = grid.down('combo[name=section_id]').getValue(),
			           zone_id = grid.down('combo[name=zone_id]').getValue(),
			           to_date = grid.down('datefield[name=to_date]').getValue(),
			           from_date=grid.down('datefield[name=from_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        business_type: business_type,
                        business_type_category: business_type_category,
                        section_id:section_id,
                        zone_id:zone_id,
                        to_date: to_date,
                        from_date: from_date
                }
                
        	},
    },{
        xtype: 'button',
        handler: 'printBusinessTypeBasedInspectionReport',
        text: 'Export Report',
        ui: 'soft-green',
        iconCls: 'fa fa-print'
    },{
        xtype: 'exportbtn'
    }],
    features: [{
        ftype: 'groupingsummary',
        startCollapsed: true,
        groupHeaderTpl: 'Business Type Category: {[values.rows[0].data.business_type_category]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        //hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'business_type_category',
                storeId: 'inspectionbusinesstypesStr',
                proxy: {
                    url: 'summaryreport/getBusinessTypeBasedInspectionReport'
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
        dataIndex: 'zone_name',
        text: 'Zone Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type_category',
        text: 'Business Type Category',
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
        dataIndex: 'registered_count',
        text: 'Registered',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'unregistered_count',
        text: 'Non Registered',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'complied_count',
        text: 'Complied',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          }
    }]
    
});
