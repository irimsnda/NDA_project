Ext.define('Admin.view.summaryreport.pms.view.grid.PMSZonalReportGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'pmszonalreportGrid',
    layout: 'fit',
   // width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'pmszonalreportStr',
                remoteFilter: true,
                grouper: {
                    groupFn: function (item) {
                        return item.get('zone_name') + item.get('region_name');
                    }
                },
                //groupField: 'zone_name',
                proxy: {
                    url: 'summaryreport/getPMSZonalReport'
                }
            },
            isLoad: true
        },
           
    },

    plugins: [{
		    ptype: 'gridexporter'
		 },{
            ptype: 'filterfield'
       }],
	features: [{
			 startCollapsed: true,
             ftype: 'groupingsummary',
             groupHeaderTpl: 'Zone: {[values.rows[0].data.zone_name]} Region: {[values.rows[0].data.region_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',

		    }],
   tbar: [{
       xtype: 'form',
       layout: 'column',
       margin: 2,
       defaults: {
           columnWidth: 2
       },
       items: [{
            xtype: 'combo',
            fieldLabel: 'Zone',
            labelAlign : 'top',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'zone_id',
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
                        },
            }
        
        },{
            xtype: 'combo',
            fieldLabel: 'Region',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'region_id',
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
                                table_name: 'par_regions'
                            }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                    var store=this.getStore();
                    
                    var all={name: 'All',id:0};
                      store.insert(0, all);
                    }

            }
        },{
            xtype: 'combo',
            fieldLabel: 'Classification',
            labelAlign : 'top',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            labelAlign : 'top',
            displayField: 'name',
            name: 'classification_id',
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
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'classification',
                                con: 'lims_db'
                            }
                       }
                    },
                    isLoad: true
                },
            }
        },{
            xtype: 'datefield',
            fieldLabel: 'From',
            columnWidth: 0.2,
            labelAlign : 'top',
            format: 'Y-m-d',
            name: 'from_date',
            allowBlank: false
        },{
            xtype: 'datefield',
            name: 'to_date',
            format: 'Y-m-d',
            fieldLabel: 'To',
            labelAlign : 'top',
            allowBlank: false
        },{ 
            xtype: 'button',
            text: 'Search Filter',
            margin: '30 0 0 10',
            ui: 'soft-green',
            iconCls: 'fa fa-search',
            handler: 'func_refreshGrid',
            formBind: true,
        }
       ]
   }],
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'classification',
        name: 'classification',
        text: 'Classification',
        flex: 1,
        tbCls: 'wrap',
        summaryRenderer: function(){
                return '<b>Region Total:</b>';
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_name',
        name: 'product_name',
        text: 'Product',
        flex: 1,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            },
	},{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total',
        flex: 1,
        tdCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
    }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
                    zone_id = grid.down('combo[name=zone_id]').getValue(),
                    region_id = grid.down('combo[name=region_id]').getValue(),
                    from_date = grid.down('datefield[name=from_date]').getValue(),
                    to_date = grid.down('datefield[name=to_date]').getValue(),
                    classification_id = grid.down('combo[name=classification_id]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                    zone_id: zone_id,
                    region_id: region_id,
                    from_date: from_date,
                    to_date: to_date,
                    classification_id: classification_id
                }
                
        	},
        
        
    },'->',{
        xtype: 'button',
        text: 'Export Summary',
        handler: 'printPMSZonalReport',
        iconCls: 'fa fa-print',
        ui: 'soft-green'
    }],

    });
